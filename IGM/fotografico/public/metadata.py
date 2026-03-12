import sys
import os
import xml.etree.ElementTree as ET
from PIL import Image, ExifTags
from datetime import datetime
import hashlib
import io

# ---------- CONFIG ----------
if len(sys.argv) < 2:
    sys.exit(1)

image_url = sys.argv[1]

ROOT_URL = "http://195.231.23.205/fotografico/"
ROOT_PATH = "/var/www/html/fotografico/"

relative_path = image_url.replace(ROOT_URL, "")
image_path = os.path.join(ROOT_PATH, relative_path)
image_name = os.path.basename(image_path)
base_name = os.path.splitext(image_name)[0]

def checksum_md5(file_path):
    md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            md5.update(chunk)
    return md5.hexdigest()

def image_tech_metadata(image_path):
    with Image.open(image_path) as img:
        exif = {}
        raw_exif = img._getexif()
        if raw_exif:
            for k, v in raw_exif.items():
                tag = ExifTags.TAGS.get(k, k)
                exif[tag] = str(v)
        return {
            "width": img.width,
            "height": img.height,
            "format": img.format,
            "created": datetime.fromtimestamp(os.path.getmtime(image_path)).isoformat(),
            "software": exif.get("Software"),
            "datetime_original": exif.get("DateTimeOriginal")
        }

# ---------- CREAR XML ----------
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
    "{http://www.loc.gov/METS/}mets",
    OBJID=f"IGM_{base_name}",
    PROFILE="METS ECO-MiC 1.1",
    attrib={"{http://www.w3.org/2001/XMLSchema-instance}schemaLocation":
            "http://www.loc.gov/METS/ http://www.loc.gov/standards/mets/mets.xsd"}
)

# ---------- metsHdr ----------
metsHdr = ET.SubElement(root, "{http://www.loc.gov/METS/}metsHdr",
                        CREATEDATE=datetime.now().isoformat())
creator = ET.SubElement(metsHdr, "{http://www.loc.gov/METS/}agent", ROLE="CREATOR", TYPE="ORGANIZATION")
ET.SubElement(creator, "{http://www.loc.gov/METS/}name").text = "Ministero della Cultura"
custodian = ET.SubElement(metsHdr, "{http://www.loc.gov/METS/}agent", ROLE="CUSTODIAN", TYPE="ORGANIZATION")
ET.SubElement(custodian, "{http://www.loc.gov/METS/}name").text = "Istituto Geografico Militare – Archivio Fotografico"

# ---------- dmdSec ----------
dmdSec = ET.SubElement(root, "{http://www.loc.gov/METS/}dmdSec", ID="dmd01", STATUS="minimum")
mdWrap = ET.SubElement(dmdSec, "{http://www.loc.gov/METS/}mdWrap", MDTYPE="MODS")
xmlData = ET.SubElement(mdWrap, "{http://www.loc.gov/METS/}xmlData")
mods = ET.SubElement(xmlData, "{http://www.loc.gov/mods/v3}mods")
ET.SubElement(mods, "{http://www.loc.gov/mods/v3}identifier", type="logicalId").text = base_name
ET.SubElement(mods, "{http://www.loc.gov/mods/v3}identifier", type="conservativeId").text = "IT-IGM"
ET.SubElement(mods, "{http://www.loc.gov/mods/v3}typeOfResource").text = "still image"
location = ET.SubElement(mods, "{http://www.loc.gov/mods/v3}location")
ET.SubElement(location, "{http://www.loc.gov/mods/v3}physicalLocation").text = "Istituto Geografico Militare, Archivio Fotografico, Firenze"

# ---------- amdSec ----------
tech = image_tech_metadata(image_path)
amdSec = ET.SubElement(root, "{http://www.loc.gov/METS/}amdSec")
techMD = ET.SubElement(amdSec, "{http://www.loc.gov/METS/}techMD", ID="tech01")
mdWrap = ET.SubElement(techMD, "{http://www.loc.gov/METS/}mdWrap", MDTYPE="NISOIMG")
xmlData = ET.SubElement(mdWrap, "{http://www.loc.gov/METS/}xmlData")
mix = ET.SubElement(xmlData, "{http://www.loc.gov/mix/}mix")
basic = ET.SubElement(mix, "{http://www.loc.gov/mix/}BasicDigitalObjectInformation")
ET.SubElement(basic, "{http://www.loc.gov/mix/}FormatName").text = tech.get("format", "UNKNOWN")
ET.SubElement(basic, "{http://www.loc.gov/mix/}ImageWidth").text = str(tech.get("width", 0))
ET.SubElement(basic, "{http://www.loc.gov/mix/}ImageHeight").text = str(tech.get("height", 0))
ET.SubElement(basic, "{http://www.loc.gov/mix/}DateTimeCreated").text = tech.get("created", "UNKNOWN")
if tech.get("datetime_original"):
    ET.SubElement(basic, "{http://www.loc.gov/mix/}DateTimeOriginal").text = tech["datetime_original"]
if tech.get("software"):
    ET.SubElement(basic, "{http://www.loc.gov/mix/}CreatingApplication").text = tech["software"]

# ---- rightsMD ----
rightsMD = ET.SubElement(amdSec, "{http://www.loc.gov/METS/}rightsMD", ID="rights01")
mdWrap = ET.SubElement(rightsMD, "{http://www.loc.gov/METS/}mdWrap", MDTYPE="DC", MIMETYPE="text/xml")
xmlData = ET.SubElement(mdWrap, "{http://www.loc.gov/METS/}xmlData")
ET.SubElement(xmlData, "{http://purl.org/dc/terms/}rightsHolder").text = "Istituto Geografico Militare"
ET.SubElement(xmlData, "{http://purl.org/dc/terms/}license").text = "https://w3id.org/italia/controlled-vocabulary/licences/BC_Standard_1.0"
ET.SubElement(xmlData, "{http://purl.org/dc/terms/}rights").text = "http://rightsstatements.org/vocab/NoC-OKLR/1.0"

# ---------- fileSec ----------
fileSec = ET.SubElement(root, "{http://www.loc.gov/METS/}fileSec")
grp_internal = ET.SubElement(fileSec, "{http://www.loc.gov/METS/}fileGrp", USE="INTERNAL")
grp_image = ET.SubElement(grp_internal, "{http://www.loc.gov/METS/}fileGrp", USE="IMAGE")

grp_high = ET.SubElement(grp_image, "{http://www.loc.gov/METS/}fileGrp", USE="HIGH")
file_el = ET.SubElement(
    grp_high,
    "{http://www.loc.gov/METS/}file",
    ID="IMG1",
    MIMETYPE="image/jpeg",
    SIZE=str(os.path.getsize(image_path)),
    CHECKSUM=checksum_md5(image_path),
    CHECKSUMTYPE="MD5"
)
ET.SubElement(file_el, "{http://www.loc.gov/METS/}FLocat", {"{http://www.w3.org/1999/xlink}href": image_name})

grp_preview = ET.SubElement(grp_image, "{http://www.loc.gov/METS/}fileGrp", USE="PREVIEW")
preview_file = ET.SubElement(grp_preview, "{http://www.loc.gov/METS/}file", ID="IMG1_PREVIEW", MIMETYPE="image/jpeg")
ET.SubElement(preview_file, "{http://www.w3.org/1999/xlink}FLocat", {"{http://www.w3.org/1999/xlink}href": f"{ROOT_URL}images/preview/0001/{image_name}"})

# ---------- structMap ----------
structMapP = ET.SubElement(root, "{http://www.loc.gov/METS/}structMap", TYPE="PHYSICAL")
folder = ET.SubElement(structMapP, "{http://www.loc.gov/METS/}div", TYPE="FOLDER", LABEL="Archivio Fotografico dell’Istituto Geografico Militare")
div = ET.SubElement(folder, "{http://www.loc.gov/METS/}div", TYPE="FILE", LABEL="Fotografia")
ET.SubElement(div, "{http://www.loc.gov/METS/}fptr", FILEID="IMG1")

structMapL = ET.SubElement(root, "{http://www.loc.gov/METS/}structMap", TYPE="LOGICAL")
divL = ET.SubElement(structMapL, "{http://www.loc.gov/METS/}div", TYPE="IMAGE", LABEL="Visualizzazione online")
ET.SubElement(divL, "{http://www.loc.gov/METS/}fptr", FILEID="IMG1_PREVIEW")

tree = ET.ElementTree(root)
buffer = io.BytesIO()
tree.write(buffer, encoding="utf-8", xml_declaration=True)
print(buffer.getvalue().decode())