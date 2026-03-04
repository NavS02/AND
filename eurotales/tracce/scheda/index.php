<?php
get_header();
do_action('emaurri_action_before_page_content_holder');
$postid = get_the_ID();
$lang = get_locale();
?>
<!-- map --->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
  crossorigin="" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
  crossorigin=""></script>
<style>
  #map {
    width: 424px;
    height: 566px;
  }
</style>
<main id="qodef-page-content"
  class="qodef-grid qodef-layout--template <?php echo esc_attr(emaurri_get_grid_gutter_classes()); ?>">
  <div class="qodef-grid-inner clear">
    <main id="qodef-page-content" class="qodef-grid qodef-layout--template ">
      <div class="qodef-grid-inner clear">
        <div class="qodef-grid-item qodef-page-content-section qodef-col--12">
          <div class="qodef-portfolio qodef-m qodef-portfolio-single qodef-layout--slider-small">
            <article
              class="qodef-portfolio-single-item qodef-variations--small qodef-e post-1571 portfolio-item type-portfolio-item status-publish has-post-thumbnail hentry portfolio-category-projects portfolio-tag-design portfolio-tag-modern">
              <div class="qodef-e-inner">
                <div class="qodef-e-content qodef-grid qodef-layout--template ">
                  <div class="qodef-grid-inner clear">
                    <div class="qodef-grid-item qodef-col--8">
                      <!-- slider  --->
                      <div
                        class="qodef-media qodef-swiper-container qodef--slider swiper-container-initialized swiper-container-horizontal qodef-swiper--initialized">
                        <div class="swiper-wrapper"
                          style="transform: translate3d(-1682px, 0px, 0px); transition-duration: 0ms;">
                          <?php
                          $metas = carbon_get_post_meta($postid, 'traccia_allegati_media');
                          foreach ($metas as $item) {
                            if ($item[traccia_allegati_media_image]) { ?>
                          <!-- slider loop  --->
                          <div class="swiper-slide " itemprop="image" data-type="image" data-swiper-slide-index="1"
                            style="width: 861px;">
                            <?php if ($item[traccia_allegati_media_link]) { ?><a target="_blank"
                              href="<?php echo $item[traccia_allegati_media_link]; ?>">
                              <?php } ?>
                              <div class="innr-slider"
                                style="background-image: url(<?php echo wp_get_attachment_url($item[traccia_allegati_media_image], 'full') ?>);width: 861px;background-repeat: no-repeat; background-position: center;background-size: contain;">
                              </div>
                              <?php if ($item[traccia_allegati_media_link]) { ?>
                            </a>
                            <?php } ?>
                            <div class="dida">
                              <p>
                                <?php echo $item[traccia_allegati_media_dida]; ?>
                              </p>
                            </div>
                          </div>
                          <?php } elseif ($item[traccia_allegati_media_tipo] == "youtube_video") {
                              ?>
                          <div class="swiper-slide " itemprop="image" data-type="image" data-swiper-slide-index="1"
                            style="width: 861px;">
                            <a target="_blank" href="<?php echo $item[traccia_allegati_media_link]; ?>">
                              <iframe width="820" height="545" src="<?php echo $item[traccia_allegati_media_link]; ?>">
                              </iframe>
                            </a>
                            <div class="dida">
                              <p>
                                <?php echo $item[traccia_allegati_media_dida]; ?>
                              </p>
                            </div>
                          </div>
                          <?php
                            } elseif ($item[traccia_allegati_media_tipo] == "video") { ?>
                          <div class="swiper-slide " itemprop="image" data-type="image" data-swiper-slide-index="1"
                            style="width: 861px;">
                            <a target="_blank" href="<?php echo $item[traccia_allegati_media_link]; ?>">
                              <video width="820" height="545" controls webkitallowfullscreen mozallowfullscreen
                                allowfullscreen src="<?php echo $item[traccia_allegati_media_link]; ?>"></video>
                            </a>
                            <div class="dida">
                              <p>
                                <?php echo $item[traccia_allegati_media_dida]; ?>
                              </p>
                            </div>
                          </div>
                          <?php } elseif ($item[traccia_allegati_media_tipo] == "audio") { ?>
                          <div class="swiper-slide " itemprop="image" data-type="image" data-swiper-slide-index="1"
                            style="width: 861px;">
                            <?php if ($item[traccia_allegati_media_link]) { ?><a target="_blank"
                              href="<?php echo $item[traccia_allegati_media_link]; ?>">
                              <?php } ?>
                              <div class="innr-slider"
                                style="background-image: url(https://www.eurotales.eu/wp-content/uploads/2021/07/icons8-audio-100.png);width: 261px;margin: auto;background-repeat: no-repeat; background-position: center;background-size: contain;">
                              </div>
                              <?php if ($item[traccia_allegati_media_link]) { ?>
                            </a>
                            <?php } ?>
                            <div class="dida">
                              <p>
                                <?php echo $item[traccia_allegati_media_dida]; ?>
                              </p>
                            </div>
                          </div>
                          <?php }
                          } ?>
                        </div>
                        <!-- slider button  --->
                        <div class="swiper-button-prev " tabindex="0" role="button" aria-label="Previous slide"><svg
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                            y="0px" width="27.67px" height="38.13px" viewBox="0 0 27.67 38.13" xml:space="preserve">
                            <g>
                              <line fill="none" stroke="#E1E1E1" stroke-linecap="round" stroke-linejoin="round"
                                stroke-miterlimit="10" x1="27.05" y1="27.08" x2="19.05" y2="19.08"></line>
                              <line fill="none" stroke="#E1E1E1" stroke-linecap="round" stroke-linejoin="round"
                                stroke-miterlimit="10" x1="27.05" y1="11.08" x2="19.05" y2="19.08"></line>
                            </g>
                            <g>
                              <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-miterlimit="10" x1="0.62" y1="0.58" x2="19.12" y2="19.08"></line>
                              <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-miterlimit="10" x1="0.62" y1="37.58" x2="19.12" y2="19.08"></line>
                            </g>
                          </svg></div>
                        <div class="swiper-button-next " tabindex="0" role="button" aria-label="Next slide"><svg
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                            y="0px" width="27.67px" height="38.13px" viewBox="0 0 27.67 38.13" xml:space="preserve">
                            <g>
                              <line fill="none" stroke="#E1E1E1" stroke-linecap="round" stroke-linejoin="round"
                                stroke-miterlimit="10" x1="27.05" y1="27.08" x2="19.05" y2="19.08"></line>
                              <line fill="none" stroke="#E1E1E1" stroke-linecap="round" stroke-linejoin="round"
                                stroke-miterlimit="10" x1="27.05" y1="11.08" x2="19.05" y2="19.08"></line>
                            </g>
                            <g>
                              <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-miterlimit="10" x1="0.62" y1="0.58" x2="19.12" y2="19.08"></line>
                              <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-miterlimit="10" x1="0.62" y1="37.58" x2="19.12" y2="19.08"></line>
                            </g>
                          </svg></div>
                        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                      </div>
                      <!-- content  --->
                      <?php FunctionIscrizioni($postid); ?>
                      <div class="qodef-e qodef-portfolio-content">
                        <?php $traccia_descrizione = get_post_meta($postid, '_traccia_descrizione', false);
                        if ($traccia_descrizione[0]) { ?>
                        <?php if ($lang == "it_IT") {
                          echo '<h5 class="qodef-widget-title"  style="margin: 0px;">Descrizione</h5>';
                        } else {
                          echo '<h5 class="qodef-widget-title">Description</h5>';
                        } ?>
                        <p>
                          <?php echo $traccia_descrizione[0]; ?>
                        </p>
                        <div id="show">
                          <p>
                            <?php $approfondimento = get_post_meta($postid, '_traccia_approfondimento', false);
                            echo $approfondimento[0]; ?>
                          </p>
                        </div>
                        <?php }
                        if ($approfondimento[0]) { ?>
                        <p style="text-align: center;">
                          <button onclick="myFunction()" type="submit" id="myBtn"
                            class="qodef-button qodef-layout--outlined"><span class="qodef-m-text">
                              <?php echo esc_html__('deeping', 'emaurri') ?>
                            </span>
                            <span class="qodef-m-corner qodef--top-left"></span>
                            <span class="qodef-m-corner qodef--top-right"></span>
                            <span class="qodef-m-corner qodef--bottom-left"></span>
                            <span class="qodef-m-corner qodef--bottom-right"></span>
                            <span class="qodef-m-btn-line qodef-btn-line--top"></span>
                            <span class="qodef-m-btn-line qodef-btn-line--right"></span>
                            <span class="qodef-m-btn-line qodef-btn-line--bottom"></span>
                            <span class="qodef-m-btn-line qodef-btn-line--left"></span>
                          </button>
                        </p>
                        <?php } ?>
                        <?php $Conservazione = get_post_meta($postid, '_traccia_conservazione', false);
                        if ($Conservazione[0]) { ?>

                        <?php if ($lang == "it_IT") {
                          echo '<h5 class="qodef-widget-title"  style="margin: 0px;"> Conservazione </h5>';
                        } else {
                          echo '<h5 class="qodef-widget-title"  style="margin: 0px;"> Storage </h5>';
                        } ?>
                        <p>
                          <?php echo $Conservazione[0]; ?>
                        </p>
                        <?php } ?>
                        <?php Bibliografia($postid);

                        $metas = carbon_get_post_meta($postid, 'traccia_allegati_media'); ?>
                        <h5 class="qodef-widget-title" style="margin: 0px;">Links</h5>
                        <?php foreach ($metas as $item) {
                          if ($item[traccia_allegati_media_tipo] == "link") { ?>
                        <div class="qodef-e qodef-portfolio-content">
                          <p>
                            <?php if ($item[traccia_allegati_media_dida]) {
                              echo $item[traccia_allegati_media_dida];
                            } ?>
                            <?php if ($item[traccia_allegati_media_logo]) {
                              if ($item[traccia_allegati_media_link]) { ?> <a
                              target="_blank" href="<?php echo $item[traccia_allegati_media_link]; ?>">
                              <?php } ?> <span><img
                                  src="<?php echo wp_get_attachment_url($item[traccia_allegati_media_logo], 'full'); ?>"
                                  style="max-width: 150px;padding-left: 58px;"></span>
                              <?php }
                            if ($item[traccia_allegati_media_link]) { ?>
                            </a>
                            <?php } ?>
                          </p>
                        </div>
                        <?php } elseif ($item[traccia_allegati_media_tipo] == "pdf") { ?>
                        <div class="qodef-e qodef-portfolio-content">
                          <p>
                            <?php if ($item[traccia_allegati_media_dida]) {
                              echo $item[traccia_allegati_media_dida];
                            } ?>
                            <?php if ($item[traccia_allegati_media_link]) {
                              if ($item[traccia_allegati_media_link]) { ?> <a
                              target="_blank" href="<?php echo $item[traccia_allegati_media_link]; ?>">
                              <?php } ?> <span><img max-width="1311" height="1035"
                                  src="https://www.eurotales.eu/wp-content/uploads/2021/07/icons8-pdf-100.png"
                                  style="max-width: 90px;padding-left: 58px;"></span>
                              <?php }
                            if ($item[traccia_allegati_media_link]) { ?>
                            </a>
                            <?php } ?>
                          </p>
                        </div>
                        <?php }
                        } ?>
                      </div>
                      <style>
                        #show {
                          display: none;
                        }
                      </style>
                      <script>
                        function myFunction() {
                          var show = document.getElementById("show");
                          var btnText = document.getElementById("myBtn");
                          if (show.style.display === "inline") {
                            btnText.innerHTML = "<?php echo esc_html__('Back to short text', 'emaurri') ?>";
                            show.style.display = "none";
                          } else {
                            show.style.display = "inline";
                            btnText.innerHTML = "<?php echo esc_html__('Back to short text', 'emaurri') ?>";
                          }
                          if (show.style.display === "none") {

                            btnText.innerHTML = "<?php echo esc_html__('deeping', 'emaurri') ?>";
                            show.style.display = "none";
                          } else {
                            show.style.display = "inline";
                            btnText.innerHTML = "<?php echo esc_html__('Back to short text', 'emaurri') ?>";
                          }
                        }
                      </script>
                      <!-- Iscrizioni  --->
                      <div class="meta-data" style="padding-top: 12px;">
                        <?php $_traccia_autore = get_post_meta($postid, '_traccia_autore-trascrizione', false);
                        if ($_traccia_autore[0]) { ?>
                        <div class="info-inner-div-t1">
                          <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                <?php if ($lang == "it_IT") {
                                  echo "Autore trascrizione:";
                                } else {
                                  echo "Transcription author:";
                                } ?>
                              </b></span>
                            <?php echo $_traccia_autore[0]; ?>
                          </p>
                        </div>
                        <?php } ?>
                        <?php $_traccia_scheda = get_post_meta($postid, '_traccia_autore-scheda', false);
                        if ($_traccia_scheda[0]) { ?>
                        <div class="info-inner-div-t1">
                          <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                <?php if ($lang == "it_IT") {
                                  echo "Autore scheda:";
                                } else {
                                  echo "Card author:";
                                } ?>
                              </b></span>
                            <?php echo $_traccia_scheda[0]; ?>
                          </p>
                        </div>
                        <?php } ?>
                        <?php $traccia_traduzione = get_post_meta($postid, '_traccia_autore-traduzione', false);
                        if ($traccia_traduzione[0]) { ?>
                        <div class="info-inner-div-t1">
                          <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                <?php if ($lang == "it_IT") {
                                  echo "Autore traduzione:";
                                } else {
                                  echo "Translation author:";
                                } ?>
                              </b></span>
                            <?php echo $traccia_traduzione[0]; ?>
                          </p>
                        </div>
                        <?php } ?>
                        <?php $datapubblicazione = get_post_meta($postid, '_traccia_datapubblicazione', false);
                        if ($datapubblicazione[0]) { ?>
                        <div class="info-inner-div-t1">
                          <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                <?php if ($lang == "it_IT") {
                                  echo "Data Pubblicazione:";
                                } else {
                                  echo "Publication Date:";
                                } ?>
                              </b></span>
                            <?php echo $datapubblicazione[0]; ?>
                          </p>
                        </div>
                        <?php } ?>
                      </div>
                    </div>
                    <!-- content side column  --->
                    <div class="qodef-grid-item qodef-col--4 ">
                      <div class="tarccia-info-box-sidebar">
                        <div id="categories-3" class="widget widget_categories" data-area="qodef-main-sidebar">
                          <h5 class="qodef-widget-title" style="margin: 0px;">
                            <?php echo get_the_title($postid); ?>
                          </h5>
                          <div class="meta-data-r1" style="padding: 0px;">
                            <div class="info-inner-div-t1">
                              <?php $traccia_tipo = get_post_meta($postid, '_traccia_tipo', false);
                              if ($traccia_tipo[0]) {
                                ?>
                              <div class="info-inner-div-t1">
                                <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                      <?php if ($lang == "it_IT") {
                                        echo "Tipo di traccia:";
                                      } else {
                                        echo "Trace type:";
                                      } ?>
                                    </b></span>
                                  <?php
                                  $translations = get_locale($postid);
                                  if ($translations == "it_IT") {
                                    $traccia_tipo = get_post_meta($postid, '_traccia_tipo', false);
                                    echo $traccia_tipo[0]; ?>
                                </p>
                                <?php
                                  } else {
                                    $traccia_tipo = get_post_meta($postid, '_traccia_tipo', false);
                                    if ($traccia_tipo[0] == "oggetto parlante") {
                                      echo "speaking object";
                                    }
                                    if ($traccia_tipo[0] == "graffito") {
                                      echo "graffiti";
                                    }
                                    if ($traccia_tipo[0] == "iscrizione") {
                                      echo "signing up";
                                    }
                                    if ($traccia_tipo[0] == "voce/tradizione orale") {
                                      echo "voice / oral tradition";
                                    }
                                    if ($traccia_tipo[0] == "canto") {
                                      echo "song";
                                    }
                                    if ($traccia_tipo[0] == "altro") {
                                      echo "other";
                                    } ?>
                                </p>
                                <?php
                                  }
                                  ?>
                              </div>
                              <?php } ?>
                            </div>
                          </div>
                          <div class="meta-data-r1" style="padding: 0px;">
                            <?php $numeroinventario = get_post_meta($postid, '_traccia_numeroinventario', false);
                            if ($numeroinventario[0]) { ?>
                            <div class="info-inner-div-t1">
                              <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                    <?php if ($lang == "it_IT") {
                                      echo "Numero di Inventario:";
                                    } else {
                                      echo "Inventory number:";
                                    } ?>
                                  </b></span>
                                <?php $numeroinventario = get_post_meta($postid, '_traccia_numeroinventario', false);
                                echo $numeroinventario[0]; ?>
                              </p>
                            </div>
                            <?php } ?>
                            <?php $traccia_materiali = get_post_meta($postid, '_traccia_materiali', false);
                            if ($traccia_materiali[0]) { ?>
                            <div class="info-inner-div-t1">
                              <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                    <?php if ($lang == "it_IT") {
                                      echo "Materia:";
                                    } else {
                                      echo "Material:";
                                    } ?>
                                  </b></span>
                                <?php echo $traccia_materiali[0]; ?>
                              </p>
                            </div>
                            <?php } ?>
                            <?php $traccia_dimensioni = get_post_meta($postid, '_traccia_dimensioni', false);
                            if ($traccia_dimensioni[0]) { ?>
                            <div class="info-inner-div-t1">
                              <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                    <?php if ($lang == "it_IT") {
                                      echo "Dimensioni:";
                                    } else {
                                      echo "Dimensions:";
                                    } ?>
                                  </b></span>
                                <?php echo $traccia_dimensioni[0]; ?>
                              </p>
                            </div>
                            <?php } ?>
                          </div>
                          <div class="meta-data-r1" style="padding: 0px;">
                            <?php $traccia_datazione = get_post_meta($postid, '_traccia_datazione', false);
                            if ($traccia_datazione[0]) { ?>
                            <div class="info-inner-div-t1">
                              <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                    <?php if ($lang == "it_IT") {
                                      echo "Datazione:";
                                    } else {
                                      echo "Dating:";
                                    } ?>
                                  </b></span>
                                <?php echo $traccia_datazione[0]; ?>
                              </p>
                            </div>
                            <?php } ?>
                            <?php $traccia_anno = get_post_meta($postid, '_traccia_anno', false);
                            if ($traccia_anno[0]) { ?>
                            <div class="info-inner-div-t1">
                              <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                    <?php if ($lang == "it_IT") {
                                      echo "Anno:";
                                    } else {
                                      echo "Year:";
                                    } ?>
                                  </b></span>
                                <?php echo $traccia_anno[0]; ?>
                              </p>
                            </div>
                            <?php } ?>
                          </div>
                          <div class="meta-data-r1" style="padding: 0px;">
                            <div class="info-inner-div-t1">
                              <?php
                              $metas = carbon_get_post_meta($postid, 'traccia_lingua');
                              if ($metas) {
                                ?>
                              <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                    <?php if ($lang == "it_IT") {
                                      echo "Lingua:";
                                    } else {
                                      echo "Language:";
                                    } ?>
                                  </b></span>
                                <?php
                              }
                              $numItems = count($metas);
                              $i = 1;
                              foreach ($metas as $item) {
                                if ($item[traccia_lingua]) { ?>
                                <?php
                                if ($translations == "it_IT") {
                                  echo esc_html__($item[traccia_lingua], 'emaurri');
                                } else {
                                  if ($item[traccia_lingua] == "Albanese") {
                                    echo "Albanian";
                                  }
                                  if ($item[traccia_lingua] == "Andaluso") {
                                    echo "Andalusian";
                                  }
                                  if ($item[traccia_lingua] == "Antico francone	") {
                                    echo "Frankish";
                                  }
                                  if ($item[traccia_lingua] == "Arabo") {
                                    echo "Arabic ";
                                  }
                                  if ($item[traccia_lingua] == "Armeno") {
                                    echo "Armenian";
                                  }
                                  if ($item[traccia_lingua] == "Bengali") {
                                    echo "Bengali";
                                  }
                                  if ($item[traccia_lingua] == "Berbero") {
                                    echo "Berber";
                                  }
                                  if ($item[traccia_lingua] == "Bielorusso") {
                                    echo "Bielorussian";
                                  }
                                  if ($item[traccia_lingua] == "Bretone") {
                                    echo "Breton";
                                  }
                                  if ($item[traccia_lingua] == "Bulgaro") {
                                    echo "Bulgarian";
                                  }
                                  if ($item[traccia_lingua] == "Catalano") {
                                    echo "Catalan";
                                  }
                                  if ($item[traccia_lingua] == "Ceco") {
                                    echo "Chech";
                                  }
                                  if ($item[traccia_lingua] == "Cinese mandarino	") {
                                    echo "Chinese";
                                  }
                                  if ($item[traccia_lingua] == "Coreano") {
                                    echo "Korean";
                                  }
                                  if ($item[traccia_lingua] == "Corso") {
                                    echo "Corsican";
                                  }
                                  if ($item[traccia_lingua] == "Croato") {
                                    echo "Croatian";
                                  }
                                  if ($item[traccia_lingua] == "Curdo") {
                                    echo "Kurdish";
                                  }
                                  if ($item[traccia_lingua] == "Danese") {
                                    echo "Danish";
                                  }
                                  if ($item[traccia_lingua] == "Dialetto romanzo	") {
                                    echo "Romance vernacular";
                                  }
                                  if ($item[traccia_lingua] == "Ebraico") {
                                    echo "Hebrew";
                                  }
                                  if ($item[traccia_lingua] == "Estone") {
                                    echo "Estonian";
                                  }
                                  if ($item[traccia_lingua] == "Etrusco") {
                                    echo "Etruscan";
                                  }
                                  if ($item[traccia_lingua] == "Faeroico") {
                                    echo "Faer Oer";
                                  }
                                  if ($item[traccia_lingua] == "Fiammingo") {
                                    echo "Flemish";
                                  }
                                  if ($item[traccia_lingua] == "Finlandese") {
                                    echo "Finnish";
                                  }
                                  if ($item[traccia_lingua] == "Francese") {
                                    echo "French";
                                  }
                                  if ($item[traccia_lingua] == "Francoprovenzale") {
                                    echo "Franco-Provençal";
                                  }
                                  if ($item[traccia_lingua] == "Frisone") {
                                    echo "Frison";
                                  }
                                  if ($item[traccia_lingua] == "Friulano") {
                                    echo "Frison";
                                  }
                                  if ($item[traccia_lingua] == "Gaelico") {
                                    echo "Gaelic";
                                  }
                                  if ($item[traccia_lingua] == "Gallego") {
                                    echo "Galician";
                                  }
                                  if ($item[traccia_lingua] == "Gallese") {
                                    echo "Welsh";
                                  }
                                  if ($item[traccia_lingua] == "Georgiano") {
                                    echo "Georgian";
                                  }
                                  if ($item[traccia_lingua] == "Greco") {
                                    echo "Greek";
                                  }
                                  if ($item[traccia_lingua] == "Greco antico") {
                                    echo "Ancient Greek";
                                  }
                                  if ($item[traccia_lingua] == "Greco demotico") {
                                    echo "demotic Greek";
                                  }
                                  if ($item[traccia_lingua] == "Hindi") {
                                    echo "Hindi";
                                  }
                                  if ($item[traccia_lingua] == "Inglese") {
                                    echo "English";
                                  }
                                  if ($item[traccia_lingua] == "Inglese antico") {
                                    echo "Old English";
                                  }
                                  if ($item[traccia_lingua] == "Irlandese") {
                                    echo "Irish";
                                  }
                                  if ($item[traccia_lingua] == "Irlandese antico") {
                                    echo "Old Irish";
                                  }
                                  if ($item[traccia_lingua] == "Islandese") {
                                    echo "Icelandic";
                                  }
                                  if ($item[traccia_lingua] == "Italiano") {
                                    echo "Italian";
                                  }
                                  if ($item[traccia_lingua] == "Latino") {
                                    echo "Latin";
                                  }
                                  if ($item[traccia_lingua] == "Latino volgare (tardo Latino, latino parlato)	") {
                                    echo "Vernacular Latin (Late Latin, Spoken Latin)";
                                  }
                                  if ($item[traccia_lingua] == "Lettone") {
                                    echo "Latvian";
                                  }
                                  if ($item[traccia_lingua] == "Lingue altaiche") {
                                    echo "Turkic";
                                  }
                                  if ($item[traccia_lingua] == "Lingue romanze") {
                                    echo "";
                                  }
                                  if ($item[traccia_lingua] == "Lingue slave") {
                                    echo "Slavic";
                                  }
                                  if ($item[traccia_lingua] == "Lituano") {
                                    echo "Lithuanian";
                                  }
                                  if ($item[traccia_lingua] == "Moldavo") {
                                    echo "Moldavian";
                                  }
                                  if ($item[traccia_lingua] == "Neerlandese	") {
                                    echo "Netherlandish";
                                  }
                                  if ($item[traccia_lingua] == "Neogreco") {
                                    echo "Modern Greek";
                                  }
                                  if ($item[traccia_lingua] == "Norreno") {
                                    echo "Old Norse";
                                  }
                                  if ($item[traccia_lingua] == "Norvegese (Bokmal)") {
                                    echo "Norwegian (Bokmal)";
                                  }
                                  if ($item[traccia_lingua] == "Norvegese (Nynorsk)") {
                                    echo "Norwegian (Nynorsk)";
                                  }
                                  if ($item[traccia_lingua] == "Occitano") {
                                    echo "Occitan";
                                  }
                                  if ($item[traccia_lingua] == "Osco-Umbro") {
                                    echo "Osco-Umbrian";
                                  }
                                  if ($item[traccia_lingua] == "persiano") {
                                    echo "Persian";
                                  }
                                  if ($item[traccia_lingua] == "Portoghese") {
                                    echo "Polish";
                                  }
                                  if ($item[traccia_lingua] == "Polacco") {
                                    echo "Portuguese";
                                  }
                                  if ($item[traccia_lingua] == "Punico") {
                                    echo "Punic";
                                  }
                                  if ($item[traccia_lingua] == "Romancio") {
                                    echo "Romantsch";
                                  }
                                  if ($item[traccia_lingua] == "Romeno ") {
                                    echo "Rumanian";
                                  }
                                  if ($item[traccia_lingua] == "Russo") {
                                    echo "Russian";
                                  }
                                  if ($item[traccia_lingua] == "Sardo") {
                                    echo "Sardinian";
                                  }
                                  if ($item[traccia_lingua] == "Scozzese") {
                                    echo "Scottish";
                                  }
                                  if ($item[traccia_lingua] == "Serbo") {
                                    echo "Serbian";
                                  }
                                  if ($item[traccia_lingua] == "Siciliano") {
                                    echo "Sicilian";
                                  }
                                  if ($item[traccia_lingua] == "Slovacco") {
                                    echo "Slowachian";
                                  }
                                  if ($item[traccia_lingua] == "Sloveno") {
                                    echo "Slovenian";
                                  }
                                  if ($item[traccia_lingua] == "Spagnolo") {
                                    echo "Spanish";
                                  }
                                  if ($item[traccia_lingua] == "Svedese") {
                                    echo "Swedish";
                                  }
                                  if ($item[traccia_lingua] == "Tedesco") {
                                    echo "German";
                                  }
                                  if ($item[traccia_lingua] == "Toscano") {
                                    echo "Tuscan";
                                  }
                                  if ($item[traccia_lingua] == "Tedesco") {
                                    echo "Tuscan";
                                  }
                                  if ($item[traccia_lingua] == "Turco") {
                                    echo "Turkish";
                                  }
                                  if ($item[traccia_lingua] == "Ucraino") {
                                    echo "Ukrainian";
                                  }
                                  if ($item[traccia_lingua] == "Ungherese") {
                                    echo "Hungarian";
                                  }
                                  if ($item[traccia_lingua] == "Urdu") {
                                    echo "Urdu";
                                  }
                                  if ($item[traccia_lingua] == "Veneziano") {
                                    echo "Venetian";
                                  }
                                  if ($item[traccia_lingua] == "Volgare mediano") {
                                    echo "Central Italian Vernacular";
                                  }
                                  if ($item[traccia_lingua] == "Volgare meridionale") {
                                    echo "Southern Italian Vernacular";
                                  }
                                  if ($item[traccia_lingua] == "Volgare settentrionale") {
                                    echo "Northern Italian Vernacular";
                                  }
                                  if ($item[traccia_lingua] == "Yiddisch") {
                                    echo "Yiddisch";
                                  }
                                  if ($item[traccia_lingua] == "altro") {
                                    echo "other";
                                  }
                                }
                                if ($i == $numItems) {
                                } else {
                                  echo ",";
                                }
                                ?>
                                <?php }
                                $i++;
                              }
                              ?>
                              </p>
                            </div>
                            <div class="info-inner-div-t1">
                              <?php
                              $metas = carbon_get_post_meta($postid, 'traccia_sistemi_scrittura');
                              if ($metas) {
                                ?>
                              <p itemprop="dateCreated" class="entry-date published"><span class="qodef-e-title"><b>
                                    <?php if ($lang == "it_IT") {
                                      echo "Sistemi  scrittori e Scrittura/e:";
                                    } else {
                                      echo "Writing systems:";
                                    } ?>
                                  </b></span>
                                <?php }
                              $numItems = count($metas);
                              //echo $numItems;
                                                            $i = 1;
                              foreach ($metas as $item) {
                                if ($item[traccia_sistemi_scrittura]) {
                                  if ($translations == "it_IT") {
                                    echo $item[traccia_sistemi_scrittura];
                                    if ($i == $numItems) {
                                    } else {
                                      echo ",";
                                    }
                                  } else {
                                    if ($i == $numItems) {
                                      if ($item[traccia_sistemi_scrittura] == "Alfabeto cirillico") {
                                        echo "Cyrillic alphabet";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Alfabeto greco") {
                                        echo "Greek alphabet";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Alfabeto latino") {
                                        echo "Latin alphabet";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Arabo") {
                                        echo "Arabic";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Capitale") {
                                        echo "Capital";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Capitale romana") {
                                        echo "Roman capital";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Ebraico") {
                                        echo "Jewish";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Futhark recente") {
                                        echo "Recent Futhark";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Gotica") {
                                        echo "Gothic";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Haglaz") {
                                        echo "Haglaz";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Minuscole") {
                                        echo "Lowercase";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Osco") {
                                        echo "Obscure";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Scrittura ideografica") {
                                        echo "Ideographic writing";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Scrittura insulare") {
                                        echo "Insular writing";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Scrittura onciale") {
                                        echo "Uncial writing";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Scrittura runica") {
                                        echo "Runic writing";
                                      }

                                    } else {

                                      if ($item[traccia_sistemi_scrittura] == "Alfabeto cirillico") {
                                        echo "Cyrillic alphabet";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Alfabeto greco") {
                                        echo "Greek alphabet";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Alfabeto latino") {
                                        echo "Latin alphabet";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Arabo") {
                                        echo "Arabic";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Capitale") {
                                        echo "Capital";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Capitale romana") {
                                        echo "Roman capital";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Ebraico") {
                                        echo "Jewish";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Futhark recente") {
                                        echo "Recent Futhark";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Gotica") {
                                        echo "Gothic";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Haglaz") {
                                        echo "Haglaz";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Minuscole") {
                                        echo "Lowercase";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Osco") {
                                        echo "Obscure";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Scrittura ideografica") {
                                        echo "Ideographic writing";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Scrittura insulare") {
                                        echo "Insular writing";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Scrittura onciale") {
                                        echo "Uncial writing";
                                        echo ",";
                                      }
                                      if ($item[traccia_sistemi_scrittura] == "Scrittura runica") {
                                        echo "Runic writing";
                                        echo ",";
                                      }
                                    }
                                  }
                                }
                                $i++;
                              } ?>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="side-barbox">
                        <div id='map'></div>
                        <?php Map($postid) ?>
                      </div>
                      <?php Categorylist($postid); ?>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
    </main>
    <div class="qodef-grid-item qodef-col--8">
    </div>
  </div>
</main>
<?php
// Hook to include additional content after main page content holder
do_action('emaurri_action_after_page_content_holder');
get_footer();
?>