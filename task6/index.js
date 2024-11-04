let currentQuestionIndex = 0;
const $questions = $(".Question");
const $prevButton = $('.PrevButton');
const $nextButton = $('.NextButton');

function isQuestionAnswered(index) {
    const $question = $questions.eq(index);

    // Kiểm tra câu hỏi kiểu radio
    const $radioInputs = $question.find("input[type='radio']");
    if ($radioInputs.length > 0) {
        const isAnyChecked = $radioInputs.is(":checked");
        if (!isAnyChecked) {
            $('.ValidationError').show();
            return false;
        }
    }

    // Kiểm tra câu hỏi kiểu checkbox
    const $checkboxInputs = $question.find("input[type='checkbox']");
    if ($checkboxInputs.length > 0) {
        const isAnyChecked = $checkboxInputs.is(":checked");
        if (!isAnyChecked) {
            $('.ValidationError').show();
            return false;
        }
    }

    // Kiểm tra câu hỏi kiểu textarea
    const $textarea = $question.find("textarea");
    if ($textarea.length > 0 && $textarea.val().trim() === "") {
        $('.ValidationError').show();
        return false;
    }
    return true;
}

function showQuestion(index) {
    $questions.each((i, el) => {
        $(el).toggleClass("active", i === index);
    });
    updateButton();
}

function updateButton() {
    $prevButton.toggle(currentQuestionIndex !== 0);
    if (currentQuestionIndex === $questions.length - 1) {
        $nextButton.hide();
        $prevButton.hide();
    }
}

function nextQuestion() {
    if (isQuestionAnswered(currentQuestionIndex)) {
        if (currentQuestionIndex < $questions.length - 1) {
            $nextButton.addClass('disabled');
            $prevButton.addClass('disabled');
            setTimeout(() => {
                currentQuestionIndex++;
                $('.ValidationError').hide();
                showQuestion(currentQuestionIndex);

                $('.Selection').removeClass('disabled-radio');
                $nextButton.removeClass('disabled');
                $prevButton.removeClass('disabled');
            }, 200)
        }
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        $nextButton.addClass('disabled');
        $prevButton.addClass('disabled');
        setTimeout(() => {
            currentQuestionIndex--;
            $('.ValidationError').hide();
            showQuestion(currentQuestionIndex);
            $nextButton.removeClass('disabled');
            $prevButton.removeClass('disabled');
        }, 200)
    }
}


showQuestion(currentQuestionIndex);




$('.Selection').each(function () {
    const $li = $(this);

    $li.on('click', function (event) {
        event.stopPropagation();
        const $checkbox = $li.find('.custom-checkbox');
        const $checkboxIcon = $li.find('.checkbox-icon');
        const $radio = $li.find('.custom-radio');
        const $radioIcon = $li.find('.radio-icon');

        // Xử lý checkbox
        if ($checkbox.length) {
            $checkbox.prop('checked', !$checkbox.prop('checked'));

            if ($checkbox.is(':checked')) {
                $li.addClass('checked');
                $checkboxIcon.css('boxShadow', '0 0 3px 3px rgba(40, 40, 41, 1)');

                setTimeout(() => {
                    $checkboxIcon.css('boxShadow', 'none');
                }, 100);
            } else {
                $li.removeClass('checked');
            }
        }

        // Xử lý radio
        if ($radio.length) {
            const isChecked = $radio.prop('checked');
            const currentGroup = $radio.attr('name');
            const $questionBody = $li.closest('.QuestionBody');

            $questionBody.find(`input[name="${currentGroup}"]`).prop('checked', false);
            $questionBody.find('.Selection.hover').removeClass('checked').css('backgroundColor', '#e2dad0');
            if ($questionBody.find('.Selection.no-hover').length) {
                $questionBody.find('.Selection.no-hover').removeClass('checked');
            }
            $radio.prop('checked', true);
            $li.addClass('checked');
            $radioIcon.css('boxShadow', '0 0 5px 5px rgba(40, 40, 41, 1)');
            
            $questionBody.find('.Selection').not($li).addClass('disabled-radio');
            setTimeout(() => {
                $radioIcon.css('boxShadow', 'none');
            }, 100);

            $nextButton.addClass('disabled');
            $prevButton.addClass('disabled');
            setTimeout(() => {
                if (!isChecked) {
                    nextQuestion();
                }
            }, 200);
        }
    });

    $li.on('mouseover', function () {
        if (!$li.hasClass('no-hover')) {
            $li.css('backgroundColor', '#e2dad0');
        }
        if ($li.hasClass('hover')) {
            $li.css({ 'backgroundColor': '#e2dad0', 'filter': 'brightness(99%)' });
        }
    });

    $li.on('mouseout', function () {
        const $checkbox = $li.find('.custom-checkbox');
        const $radio = $li.find('.custom-radio');
        if (!$li.hasClass('no-hover')) {
            if (($radio.length && $radio.is(':checked')) || ($checkbox.length && $checkbox.is(':checked'))) {
                $li.css('backgroundColor', '#282829');
            }
            if (($radio.length && !$radio.is(':checked')) || ($checkbox.length && !$checkbox.is(':checked'))) {
                $li.css({ 'backgroundColor': '#e2dad0', 'filter': 'brightness(100%)' });
            }
        }
    });
});
