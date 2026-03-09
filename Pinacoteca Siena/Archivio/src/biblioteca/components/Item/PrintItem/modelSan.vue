<template>
  <main id="main" class="main">
    <input
      type="text"
      class="form-control"
      id="idItem"
      required=""
      placeholder="Enter an ID"
      :value="currentId"
    />
    <button type="button" class="btn btn-primary" @click="changeItem()">
      Cerca
    </button>

    <section class="section profile" id="element">
      <div class="card" style="width: 100%; height: 50%">
        <div class="card-header">
          <img
            src="/logoSiena.png"
            alt=""
            class="center"
            style="width: 300px"
          />

          <p style="text-align: center; margin-top: 20px; font-size: 16px">
            SCHEDA SANITARIA
          </p>
        </div>
        <div class="card-body">
          <figure class="figure icona">
            <img
              :src="url"
              alt=""
              class="center"
              style="max-width: 300px"
              id="my-image"
            />
            <figcaption class="figure-caption" style="text-align: center">
              <!-- INVENTARIO: {{ response?.inv }} -->
            </figcaption>
          </figure>
          <table>
            <tr>
              <th>Titolo:</th>
              <td>{{ response?.sgtt }}</td>
            </tr>
            <tr>
              <th>Oggetto</th>
              <td>{{ response?.ogtd }}</td>
            </tr>
            <tr>
              <th>Data Opera:</th>
              <td>{{ response?.cronologia }}</td>
            </tr>
            <tr>
              <th>Artista</th>
              <td>{{ response?.autore }}</td>
            </tr>
            <tr>
              <th>Epoca</th>
              <td>{{ epoca }}</td>
            </tr>
          </table>

          <hr />

          <table>
            <tr>
              <th>Materia e tecnica:</th>
              <td>{{ response?.mtc }}</td>
            </tr>
            <tr>
              <th>Misure</th>
              <td>
                {{ response?.misu }} {{ response?.misa }} x {{ response?.misl }}
              </td>
            </tr>

            <tr>
              <th>Ingombro</th>
              <td>{{ response?.mis_ingombro }}</td>
            </tr>
            <tr>
              <th>Cornice</th>
              <td>{{ response?.mis_cornice }}</td>
            </tr>
          </table>
          <div class="card">
            <div class="card-header">
              <p style="font-weight: bold">Trasporto</p>
            </div>
            <div class="card-body">
              {{ response?.trasporto }}
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <p style="font-weight: bold">Esposizione</p>
            </div>
            <div class="card-body">
              {{ response?.esposizione }}
            </div>
          </div>
          <table>
            <tr>
              <th>Valore Assicurativo:</th>
              <td>{{ response?.stima }}</td>
            </tr>
          </table>
        </div>
      </div>
    </section>
    <button
      type="button"
      class="btn btn-primary btn-lg btn-block"
      style="width: 100%"
      @click="printItem()"
    >
      Print
    </button>
  </main>
</template>
<script>
import { ref, toRefs, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../../API";
import store from "../../../store";
import * as settings from "../../../settings";
import html2pdf from "html2pdf.js";

export default {
  setup(props, context) {
    // Define some variables to use in the component
    const route = useRoute();
    const router = useRouter();
    const user = computed(() => store.user);
    const collection = ref("");
    const item = ref("");
    const { id } = toRefs(props);
    const response = ref(null);
    const responseArray = [];
    const url = ref("/not-found.svg");
    const image = ref();
    let epoca = ref("");
    let currentId = id.value;
    // Watch for changes in the route object
    watch(
      route,
      () => {
        // Infer the collection from the route parameters
        collection.value = "opera";
        if (!collection.value) return;
        // Retrieve the settings for the collection
        const itemSettings = settings[collection.value];
        // Fetch data for the collection

        getData();
      },
      { immediate: true, deep: true }
    );

    function printItem() {
      var opt = {
        margin: 0.2,
        filename: new Date() + ".pdf",
        image: { type: "png", quality: 0.5 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          console.log("PDF Generated");
        });
      this.showAlert = false;
    }
    function changeItem() {
      currentId = document.getElementById("idItem").value;
      router.push({ name: 'modelSan', params: { id: currentId }  })
      url.value=null;

    }
    async function getData() {
      let originalResponse = {};
      try {
        if (collection.value == "opera") {
          let item = null;
          if (currentId !== id.value) {
            item = await directus.items("opera").readByQuery({
              filter: {
                id: {
                  _eq: currentId,
                },
              },
            });
          } else {
            item = await directus.items("opera").readByQuery({
              filter: {
                id: {
                  _eq: id.value,
                },
              },
            });
          }
          response.value = item.data[0];
          //    INVENTARIO
          if (item.inv !== null) {
            try {
              const idsI = item.data.map(({ inv }) => inv);
              const item_inventario = await directus
                .items("opera_inventario")
                .readByQuery({
                  limit: -1,
                  filter: {
                    id: {
                      _in: idsI,
                    },
                  },
                });
              const inventarioIds = item_inventario.data.map(
                ({ inventario_id }) => inventario_id
              );
              const inventario = await directus
                .items("inventario")
                .readByQuery({
                  limit: -1,
                  filter: {
                    id: {
                      _in: inventarioIds,
                    },
                  },
                });
              const inventarioINVN = inventario.data.map(({ invn }) => invn);
              let totalInventario = "";
              for (let index = 0; index < inventario.data.length; index++) {
                totalInventario += " " + inventario.data[index].invn;
              }
              response.value.inv = totalInventario;
            } catch (error) {
              response.value.inv = "";
            }
          }
          // OGGETTO
          if (item.ogtd !== null) {
            try {
              const idsO = item.data.map(({ ogtd }) => ogtd);

              const item_oggetto = await directus.items("ogtd").readByQuery({
                limit: -1,
                filter: {
                  id: {
                    _in: idsO,
                  },
                },
              });
              let totalOggetto = "";
              for (let index = 0; index < item_oggetto.data.length; index++) {
                totalOggetto += " " + item_oggetto.data[index].ogtd;
              }
              response.value.ogtd = totalOggetto;
            } catch (error) {
              response.value.inv = "";
            }
          }
          // AUTORE
          if (item.autore !== null) {
            try {
              const idsA = item.data.map(({ autore }) => autore);
              const item_autore = await directus
                .items("opera_autore")
                .readByQuery({
                  limit: -1,
                  filter: {
                    id: {
                      _in: idsA,
                    },
                  },
                });
              const idsAutOp = item_autore.data.map(
                ({ autore_id }) => autore_id
              );
              const autore = await directus.items("autore").readByQuery({
                limit: -1,
                filter: {
                  id: {
                    _in: idsAutOp,
                  },
                },
              });
              let totalAutore = "";
              epoca.value = null;
              for (let index = 0; index < autore.data.length; index++) {
                totalAutore += autore.data[index].autn + ", ";
                // epoca.value +=
                //   " (" + (index + 1) + ") " + autore.data[index].auta;
              }
              response.value.autore = totalAutore;
            } catch (error) {
              response.value.inv = "";
            }
          }

          // MTC
          if (item.mtc !== null) {
            try {
              const idsMTC = item.data.map(({ mtc }) => mtc);
              const item_MTC = await directus.items("opera_mtc").readByQuery({
                limit: -1,
                filter: {
                  id: {
                    _in: idsMTC,
                  },
                },
              });
              const idsMTCOp = item_MTC.data.map(({ mtc_id }) => mtc_id);
              const MTC = await directus.items("mtc").readByQuery({
                limit: -1,
                filter: {
                  id: {
                    _in: idsMTCOp,
                  },
                },
              });

              let totalMTC = "";
              for (let index = 0; index < MTC.data.length; index++) {
                totalMTC += MTC.data[index].mtc + ", ";
              }
              response.value.mtc = totalMTC;
            } catch (error) {
              response.value.inv = "";
            }
          }
          // STIMA
          if (item.stima !== null) {
            try {
              const idsStim = item.data.map(({ stima }) => stima);

              const item_stima = await directus
                .items("opera_stima")
                .readByQuery({
                  limit: -1,
                  filter: {
                    id: {
                      _in: idsStim,
                    },
                  },
                });
              const idsStimOp = item_stima.data.map(({ stima_id }) => stima_id);

              const stima = await directus.items("stima").readByQuery({
                limit: -1,
                filter: {
                  id: {
                    _in: idsStimOp,
                  },
                },
              });
              let totalStima = "";
              for (let index = 0; index < stima.data.length; index++) {
                totalStima += stima.data[index].stis + ", ";
              }
              response.value.stima = totalStima;
            } catch (error) {
              response.value.inv = "";
            }
          }
          // CRONOLOGIA
          if (item.cronologia !== null) {
            try {
              const idsCrono = item.data.map(({ cronologia }) => cronologia);

              const item_crono = await directus
                .items("opera_cronologia")
                .readByQuery({
                  limit: -1,
                  filter: {
                    id: {
                      _in: idsCrono,
                    },
                  },
                });
              const idCronologia = item_crono.data.map(
                ({ cronologia_id }) => cronologia_id
              );
              const cronologia = await directus
                .items("cronologia")
                .readByQuery({
                  limit: -1,
                  filter: {
                    id: {
                      _in: idCronologia,
                    },
                  },
                });

              let totalCrono = "";
              for (let index = 0; index < cronologia.data.length; index++) {
                totalCrono +=
                  " (" +
                  (index + 1) +
                  ") " +
                  cronologia.data[index].dtzg +
                  ", " +
                  cronologia.data[index].dtsi +
                  ", " +
                  cronologia.data[index].dtsf;
              }
              response.value.cronologia = totalCrono;
            } catch (error) {
              response.value.inv = "";
            }
          }

          // IMAGE
          url.value = import.meta.env.VITE_API_BASE_URL; //url of directus
          const imgresponse = await directus.items("opera").readByQuery({
            filter: {
              id: {
                _eq: id.value,
              },
            },
          });
          image.value = imgresponse.data[0].icona; //takes the id of the image
          if (image.value != null) {
            const imageUrl = url.value + "/assets/" + image.value; // generates url
            const imageElement = document.getElementById("my-image");

            fetch(imageUrl)
              .then((response) => response.blob())
              .then((blob) => {
                // CODE64 IMAGE
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                  const base64data = reader.result; //code64 the url
                  imageElement.src = base64data;
                };
              });
          } else {
            const imageElement = document.getElementById("my-image");
            imageElement.src = null;
          }
        }
        originalResponse = { ...response.value };
      } catch (error) {}
    }

    const opera = [
      "nctn",
      "lir",
      "ogtd",
      "piano",
      "sala",
      "parete",
      "specifiche",
      "ogtt",
      "ogtv",
      "qntn",
      "qnts",
      "sgti",
      "sgtt",
      "deso",
      "dess",
      "desi",
      "stcc",
      "stcs",
      "misa",
      "misu",
    ];

    return { response, opera, printItem, url, epoca, getData, changeItem };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onPrintClicked() {
      this.showAlert = true;
    },
    closeAlert() {
      this.showAlert = false;
    },
    greet(response) {
      const autore = ["auta", "autb"];
      let html = "";

      if (response && response.__v_raw) {
        const arrayObject = response.__v_raw;

        for (let i = 0; i < arrayObject.length; i++) {
          for (let j = 0; j < autore.length; j++) {
            html += `<h5 class="card-title">${arrayObject[i][autore[j]]}</h5>`;
          }
        }
      }

      return html;
    },
  },
  data() {
    return {
      showAlert: false,
    };
  },
};
</script>
<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

table td,
table th {
  padding: 5px;
}

.icona {
  max-width: 300px;
  max-height: 300px;
  float: right;
}
</style>
