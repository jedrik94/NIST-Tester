/**
 * Created by Komputer on 5/4/2017.
 */

var formData = new FormData();
var isReadyToUpload = false;

$('#upload-button').on('click', function () {
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
    $('#upload-warning').fadeOut("slow");
    $('#upload-success').fadeOut("slow");
});

$('#upload-input').on('change', function () {
    var files = $(this).get(0).files;
    if (!(files.length > 0)) {
        $('#warning').text('No file chosen!');
        $('#upload-warning').fadeIn();
        isReadyToUpload = false;
    }
    else if (!files[0].name.match('\.txt') && !files[0].name.match('\.bit') && !files[0].size < 26214400) {
        $('#warning').text('File extension has to be .bit or .txt and size under 25MB.');
        $('#upload-warning').fadeIn();
        isReadyToUpload = false;
    }
    else {
        $('#info').text('You have chosen file: ' + files[0].name);
        $('#upload-success').fadeIn();
        isReadyToUpload = true;

        // add the files to formData object for the data payload
        formData.append('uploads[]', files[0], files[0].name);
    }
    $(this).val('');
});

$('#submit-upload').on('click', function () {
    if (isReadyToUpload === true) {

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('upload successful!\n' + data);
                $('#analyzeWithFile').prop('disabled', false);
            },
            xhr: function () {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();

                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function (evt) {

                    if (evt.lengthComputable) {
                        // calculate the percentage of upload completed
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);

                        // update the Bootstrap progress bar with the new percentage
                        $('.progress-bar').text(percentComplete + '%');
                        $('.progress-bar').width(percentComplete + '%');

                        // once the upload reaches 100%, set the progress bar text to done
                        if (percentComplete === 100) {
                            $('.progress-bar').html('Done');
                            $('#info').text('Your file has been uploaded.');
                            $('#upload-success').fadeIn();
                        }

                    }

                }, false);

                return xhr;
            }
        });
    }
});

