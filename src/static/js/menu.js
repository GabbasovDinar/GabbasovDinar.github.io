$(document).ready(function () {

        // Добавляем плавную прокрутку ко всем ссылкам
    $("a").on('click', function(event) {

        // Убеждаемся, что this.hash имеет значение перед переопределением поведения по умолчанию
        if (this.hash !== "") {
            // Отменяем поведение якоря по умолчанию
            event.preventDefault();

            // Хэш ссылки
            var hash = this.hash;

            // Используем метод animate() jQuery для добавления плавной страницы прокрутки
            // Число (800) определяет, сколько миллисекунд требуется для прокрутки до указанной области
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                // При завершении прокрутки добавляем хэш (#) в URL (default click behavior)
                window.location.hash = hash;
            });
        } // Конец условия if
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) { // когда прокрутите на 100px вниз, покажите кнопку
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    // прокрутка наверх при клике
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800); // время в мс
        return false;
    });

});
