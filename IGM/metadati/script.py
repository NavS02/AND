import os
import xml.etree.ElementTree as ET
from PIL import Image, ExifTags
from datetime import datetime
import hashlib

# ---------------- CONFIG ----------------

image_folder = r"D:\hdd\IGM\backup_23_07_25\fotografico\0001"
output_folder = os.getcwd()

PREVIEW_BASE_URL = "http://195.231.23.205/igm/images/preview/0001"

valid_extensions = ('.jpg', '.jpeg', '.png', '.tif', '.tiff')
images = sorted(
    [f for f in os.listdir(image_folder) if f.lower().endswith(valid_extensions)]
)[:10]

# ---------------- UTILITY ----------------

def checksum_md5(file_path):
    md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            md5.update(chunk)
    return md5.hexdigest()

def image_tech_metadata(image_path):
    with Image.open(image_path) as img:
        exif = {}
        try:
            raw_exif = img._getexif()
            if raw_exif:
                for k, v in raw_exif.items():
                    tag = ExifTags.TAGS.get(k, k)
                    exif[tag] = str(v)
        except Exception:
            pass

        return {
            "width": img.width,
            "height": img.height,
            "format": img.format,
            "created": datetime.fromtimestamp(os.path.getmtime(image_path)).isoformat(),
            "software": exif.get("Software"),
            "datetime_original": exif.get("DateTimeOriginal")
        }

# ---------------- XML METS ----------------

def create_mets(image_name, image_path):
    NS = {
        "mets": "http://www.loc.gov/METS/",
        "mods": "http://www.loc.gov/mods/v3",
        "mix": "http://www.loc.gov/mix/",
        "dct": "http://purl.org/dc/terms/",
        "xlink": "http://www.w3.org/1999/xlink",
        "xsi": "http://www.w3.org/2001/XMLSchema-instance"
    }

    for p, u in NS.items():
        ET.register_namespace(p, u)

    root = ET.Element(
        f"{{{NS['mets']}}}mets",
        {
            "OBJID": f"IGM_{os.path.splitext(image_name)[0]}",
            "PROFILE": "METS ECO-MiC 1.1",
            f"{{{NS['xsi']}}}schemaLocation":
                "http://www.loc.gov/METS/ http://www.loc.gov/standards/mets/mets.xsd"
        }
    )

    # ---------- metsHdr ----------
    metsHdr = ET.SubElement(root, f"{{{NS['mets']}}}metsHdr",
                            CREATEDATE=datetime.now().isoformat())

    creator = ET.SubElement(metsHdr, f"{{{NS['mets']}}}agent",
                            ROLE="CREATOR", TYPE="ORGANIZATION")
    ET.SubElement(creator, f"{{{NS['mets']}}}name").text = "Ministero della Cultura"

    custodian = ET.SubElement(metsHdr, f"{{{NS['mets']}}}agent",
                              ROLE="CUSTODIAN", TYPE="ORGANIZATION")
    ET.SubElement(custodian, f"{{{NS['mets']}}}name").text = (
        "Istituto Geografico Militare – Archivio Fotografico"
    )

    # ---------- dmdSec ----------
    dmdSec = ET.SubElement(root, f"{{{NS['mets']}}}dmdSec",
                           ID="dmd01", STATUS="minimum")
    mdWrap = ET.SubElement(dmdSec, f"{{{NS['mets']}}}mdWrap", MDTYPE="MODS")
    xmlData = ET.SubElement(mdWrap, f"{{{NS['mets']}}}xmlData")
    mods = ET.SubElement(xmlData, f"{{{NS['mods']}}}mods")

    ET.SubElement(mods, f"{{{NS['mods']}}}identifier",
                  type="logicalId").text = os.path.splitext(image_name)[0]
    ET.SubElement(mods, f"{{{NS['mods']}}}identifier",
                  type="conservativeId").text = "IT-IGM"
    ET.SubElement(mods, f"{{{NS['mods']}}}typeOfResource").text = "still image"

    location = ET.SubElement(mods, f"{{{NS['mods']}}}location")
    ET.SubElement(location, f"{{{NS['mods']}}}physicalLocation").text = (
        "Istituto Geografico Militare, Archivio Fotografico, Firenze"
    )

    # ---------- amdSec ----------
    amdSec = ET.SubElement(root, f"{{{NS['mets']}}}amdSec")

    # ---- techMD (MIX) ----
    techMD = ET.SubElement(amdSec, f"{{{NS['mets']}}}techMD", ID="tech01")
    mdWrap = ET.SubElement(techMD, f"{{{NS['mets']}}}mdWrap", MDTYPE="NISOIMG")
    xmlData = ET.SubElement(mdWrap, f"{{{NS['mets']}}}xmlData")
    mix = ET.SubElement(xmlData, f"{{{NS['mix']}}}mix")

    tech = image_tech_metadata(image_path)

    basic = ET.SubElement(mix, f"{{{NS['mix']}}}BasicDigitalObjectInformation")
    ET.SubElement(basic, f"{{{NS['mix']}}}FormatName").text = tech["format"]
    ET.SubElement(basic, f"{{{NS['mix']}}}ImageWidth").text = str(tech["width"])
    ET.SubElement(basic, f"{{{NS['mix']}}}ImageHeight").text = str(tech["height"])
    ET.SubElement(basic, f"{{{NS['mix']}}}DateTimeCreated").text = tech["created"]

    if tech["datetime_original"]:
        ET.SubElement(basic, f"{{{NS['mix']}}}DateTimeOriginal").text = tech["datetime_original"]
    if tech["software"]:
        ET.SubElement(basic, f"{{{NS['mix']}}}CreatingApplication").text = tech["software"]

    # ---- rightsMD ----
    rightsMD = ET.SubElement(amdSec, f"{{{NS['mets']}}}rightsMD", ID="rights01")
    mdWrap = ET.SubElement(rightsMD, f"{{{NS['mets']}}}mdWrap",
                           MDTYPE="DC", MIMETYPE="text/xml")
    xmlData = ET.SubElement(mdWrap, f"{{{NS['mets']}}}xmlData")

    ET.SubElement(xmlData, f"{{{NS['dct']}}}rightsHolder").text = (
        "Istituto Geografico Militare"
    )
    ET.SubElement(xmlData, f"{{{NS['dct']}}}license").text = (
        "https://w3id.org/italia/controlled-vocabulary/licences/BC_Standard_1.0"
    )
    ET.SubElement(xmlData, f"{{{NS['dct']}}}rights").text = (
        "http://rightsstatements.org/vocab/NoC-OKLR/1.0/"
    )

    # ---------- fileSec ----------
    fileSec = ET.SubElement(root, f"{{{NS['mets']}}}fileSec")
    grp_internal = ET.SubElement(fileSec, f"{{{NS['mets']}}}fileGrp", USE="INTERNAL")
    grp_image = ET.SubElement(grp_internal, f"{{{NS['mets']}}}fileGrp", USE="IMAGE")

    # ---- MASTER (HIGH) ----
    grp_high = ET.SubElement(grp_image, f"{{{NS['mets']}}}fileGrp", USE="HIGH")
    file_id = "IMG1"

    file_el = ET.SubElement(
        grp_high, f"{{{NS['mets']}}}file",
        ID=file_id,
        MIMETYPE="image/jpeg",
        SIZE=str(os.path.getsize(image_path)),
        CHECKSUM=checksum_md5(image_path),
        CHECKSUMTYPE="MD5"
    )

    ET.SubElement(
        file_el,
        f"{{{NS['mets']}}}FLocat",
        {
            "LOCTYPE": "URL",
            f"{{{NS['xlink']}}}href": image_name
        }
    )

    # ---- PREVIEW ----
    grp_preview = ET.SubElement(grp_image, f"{{{NS['mets']}}}fileGrp", USE="PREVIEW")
    preview_id = "IMG1_PREVIEW"
    preview_url = f"{PREVIEW_BASE_URL}/{image_name}"

    preview_file = ET.SubElement(
        grp_preview, f"{{{NS['mets']}}}file",
        ID=preview_id,
        MIMETYPE="image/jpeg"
    )

    ET.SubElement(
        preview_file,
        f"{{{NS['mets']}}}FLocat",
        {
            "LOCTYPE": "URL",
            f"{{{NS['xlink']}}}href": preview_url
        }
    )

    # ---------- structMap PHYSICAL ----------
    structMapP = ET.SubElement(root, f"{{{NS['mets']}}}structMap", TYPE="PHYSICAL")
    folder = ET.SubElement(structMapP, f"{{{NS['mets']}}}div",
                           TYPE="FOLDER",
                           LABEL="Archivio Fotografico dell’Istituto Geografico Militare")
    div = ET.SubElement(folder, f"{{{NS['mets']}}}div",
                        TYPE="FILE", LABEL="Fotografia")
    ET.SubElement(div, f"{{{NS['mets']}}}fptr", FILEID=file_id)

    # ---------- structMap LOGICAL ----------
    structMapL = ET.SubElement(root, f"{{{NS['mets']}}}structMap", TYPE="LOGICAL")
    divL = ET.SubElement(structMapL, f"{{{NS['mets']}}}div",
                         TYPE="IMAGE",
                         LABEL="Visualizzazione online")
    ET.SubElement(divL, f"{{{NS['mets']}}}fptr", FILEID=preview_id)

    return ET.ElementTree(root)



for img in images:
    path = os.path.join(image_folder, img)
    tree = create_mets(img, path)
    out = os.path.join(output_folder, os.path.splitext(img)[0] + ".xml")
    tree.write(out, encoding="utf-8", xml_declaration=True)
    print(f"Creato METS: {out}")
print("Operazione completata.")