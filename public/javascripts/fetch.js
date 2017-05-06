/**
 * Created by Komputer on 5/5/2017.
 */

$('#allTests').change(function () {
    if (this.checked) {
        for (i = 1; i <= 15; i++) {
            $('#test' + i).prop({'checked' : true, 'disabled':  true});
            $('#test' + i).change();
        }
    }
});

$('#notAllTests').change(function () {
    if (this.checked) {
        for (i = 1; i <= 15; i++) {
            $('#test' + i).prop('disabled', false);
        }
    }
});

$('#amountBit').click(function () {
    if ($('#amountInput').val() > 0) {
        console.log($('#amountInput').prop('value'));
        $(this).text(function (index, textValue) {
            if (textValue === "Check!")
                return "Uncheck!";
            else {
                return "Check!";
            }
        });
        $('#amountInput').prop('disabled', function (index, currentValue) {
            return !currentValue;
        });
    }
});

$('#lengthBit').click(function () {
    if ($('#lengthInput').val() > 0) {
        console.log($('#lengthInput').prop('value'));
        $(this).text(function (index, textValue) {
            if (textValue === "Check!")
                return "Uncheck!";
            else {
                return "Check!";
            }
        });
        $('#lengthInput').prop('disabled', function (index, currentValue) {
            return !currentValue;
        });
    }
});

$('#test8').change(function () {
    if (!this.checked) {
        $('#nonOverlappingTempForm').fadeOut();
    } else {
        $('#nonOverlappingTempForm').fadeIn();
    }
});

$('#test9').change(function () {
    if (!this.checked) {
        $('#overlappingTempForm').fadeOut();
    } else {
        $('#overlappingTempForm').fadeIn();
    }
});

$('#test14').change(function () {
    if (!this.checked) {
        $('#serialTestForm').fadeOut();
    } else {
        $('#serialTestForm').fadeIn();
    }
});

$('#test2').change(function () {
    if (!this.checked) {
        $('#blockFreqForm').fadeOut();
    } else {
        $('#blockFreqForm').fadeIn();
    }
});

$('#test15').change(function () {
    if (!this.checked) {
        $('#linearComplexityForm').fadeOut();
    } else {
        $('#linearComplexityForm').fadeIn();
    }
});

$('#test11').change(function () {
    if (!this.checked) {
        $('#approximateEntropyForm').fadeOut();
    } else {
        $('#approximateEntropyForm').fadeIn();
    }
});


