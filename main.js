$(document).ready(function () {
    // Referencia al elemento de video
    const $video = $('.video-content');
    const videoElement = $video[0];

    // --- EJERCICIO 1.2: INTERACTIVIDAD BÁSICA (HOVER) ---
    $('.libro-hp').hover(function () {
        $(this).animate({ width: "+=10px", height: "+=10px" }, 200);
    }, function () {
        $(this).animate({ width: "-=10px", height: "-=10px" }, 200);
    });

    // --- EJERCICIO 1.2: TOGGLE DESCRIPCIÓN ---
    $('.video-content').click(function () {
        $('.video-desc').fadeToggle();
    });

    // --- EJERCICIO 2.2: DISEÑO Y ANIMACIONES (SLIDEDOWN) ---
    $('.video-content, .libro-hp').hide().slideDown(1000);

    // --- EJERCICIO 2.2: DESPLEGAR INFORMACIÓN ---
    $('#toggle-info').click(function () {
        $('#info-section').slideToggle();
    });

    // --- EJERCICIO 3.2: CONTROLES MULTIMEDIA (PLAY/PAUSE) ---
    $('.btn-play').click(function () {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    });

    // --- EJERCICIO 3.2: BOTÓN REPLAY ---
    $('.btn-replay').click(function () {
        videoElement.currentTime = 0;
        videoElement.play();
    });

    // --- EJERCICIO 3.2: BARRA DE VOLUMEN (VARITA) ---
    const $wandContainer = $('.barra-fondo-borde');
    const $knob = $('.slider-knob');
    const handleMarginLeft = 140;
    const tipMarginRight = 30;
    let isDragging = false;

    $knob.css('cursor', 'pointer');

    function initVolume() {
        const containerWidth = $wandContainer.width();
        const containerOffset = $wandContainer.offset().left;
        const maxLeft = containerOffset + containerWidth - tipMarginRight;

        $knob.offset({ left: maxLeft });
        videoElement.volume = 1.0;
        videoElement.muted = false;
    }

    setTimeout(initVolume, 100);

    $knob.on('mousedown', function (e) {
        isDragging = true;
        e.preventDefault();
    });

    $(document).on('mouseup', function () {
        isDragging = false;
    });

    $(document).on('mousemove', function (e) {
        if (isDragging) {
            let containerOffset = $wandContainer.offset().left;
            let containerWidth = $wandContainer.width();
            let newLeft = e.pageX - containerOffset;

            if (newLeft < handleMarginLeft) newLeft = handleMarginLeft;
            if (newLeft > containerWidth - tipMarginRight) newLeft = containerWidth - tipMarginRight;

            $knob.offset({ left: containerOffset + newLeft });

            const usableWidth = (containerWidth - tipMarginRight) - handleMarginLeft;
            const positionInZone = newLeft - handleMarginLeft;
            let volume = positionInZone / usableWidth;

            if (volume < 0) volume = 0;
            if (volume > 1) volume = 1;

            videoElement.volume = volume;
        }
    });


    // --- EJERCICIO 3.3: EFECTOS VISUALES (PROMOCIÓN) ---
    $('.promo-text').hover(function () {
        $(this).toggleClass('fade');
    });

    // --- EJERCICIO 3.1: FORMULARIO Y VALIDACIÓN ---
    $('.sello-img').hover(function () {
        $(this).attr('src', 'images/boton_in.png');
    }, function () {
        $(this).attr('src', 'images/boton_off.png');
    });

    $('.sello-img').click(function () {
        const nombre = $('#nombre').val();
        const libro = $('#libro').val();
        const email = $('#email').val();
        const $feedback = $('#form-feedback');

        $feedback.hide().text('');

        if (!nombre || !libro || !email) {
            $feedback.text('Por favor, rellena todos los campos mágicos.').fadeIn();
            return;
        }

        if (!email.includes('@')) {
            $feedback.text('Tu lechuza necesita un @ para llegar (Correo inválido).').fadeIn();
            return;
        }

        // --- EJERCICIO 3.1: CONFIRMACIÓN ---
        $('#confirmation-msg').html(
            `<h3 style="color: #5E0A0A; margin-bottom: 20px;">¡Travesura Realizada!</h3>
            <p style="color: #5E0A0A; font-size: 18px; line-height: 1.5;">
                La lechuza va en camino hacia <strong>${email}</strong> <br>
                con el libro para <strong>${nombre}</strong>.
            </p>
            <button id='close-confirm' style="margin-top: 20px; padding: 10px 20px; background: #5E0A0A; color: #fff; border: none; cursor: pointer; border-radius: 5px;">Cerrar</button>`
        ).fadeIn();

        // --- EJERCICIO 3.3: ANIMACIÓN FORMULARIO (OCULTAR) ---
        $('.form-bg, .inputs-container, .form-titulo, .linea-decorativa, .boton-enviar-container, #form-feedback, .logo-form, .libro-abierto').toggleClass('hidden');

        $('#close-confirm').click(function () {
            $('#confirmation-msg').fadeOut();
            $('.form-bg, .inputs-container, .form-titulo, .linea-decorativa, .boton-enviar-container, #form-feedback, .logo-form, .libro-abierto').toggleClass('hidden');
        });
    });

    // --- EJERCICIO EXTRA: PERGAMINO INTERACTIVO ---
    $('#toggle-author').click(function () {
        const $contenido = $(this).find('.pergamino-contenido');
        const $texto = $(this).find('.pergamino-texto');

        $contenido.slideToggle(400, function () {
            if ($contenido.is(':visible')) {
                $texto.text("Ocultar pergamino");
            } else {
                $texto.text("Rompe el sello del autor");
            }
        });
    });

    // --- EJERCICIO EXTRA: RESPONSIVE (ESCALADO) ---
    function scalePage() {
        const designWidth = 1440;
        const winWidth = $(window).width();
        const scale = Math.min(winWidth / designWidth, 1);

        $('.main-container').css({
            'transform': 'scale(' + scale + ')',
            'margin-left': (winWidth > designWidth) ? (winWidth - designWidth * scale) / 2 : 0
        });

        const originalHeight = 3074;
        $('body').height(originalHeight * scale);
    }

    scalePage();
    $(window).resize(scalePage);

});
