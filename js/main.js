
// apikey and secretkey for lastfm
var apikey = "336b93ab189e3196665773ae45c11248";
var info = document.querySelector('.info');
var input = document.querySelector('input');
var secretkey = "2de87acae05439985a66f1b53546d005";
// Get songinfo url
var url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apikey}&artist=cher&track=believe&format=json`;
var artistsearch = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apikey}&artist=`;
var correctionurl = `http://ws.audioscrobbler.com/2.0/?method=track.getcorrection&artist=guns%20and%20roses&track=Mrbrownstone&api_key=YOUR_API_KEY&format=json`
var tracksearch = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=`;



input.addEventListener('change', function (e)
{
    console.log("File input successful");
    var file = e.target.files[ 0 ];
    jsmediatags.read(file, {
        onSuccess: function (tag)
        {
            console.log(tag);

            var picture = tag.tags.picture; // create reference to track art
            var base64String = "";
            for (var i = 0; i < picture.data.length; i++)
            {
                base64String += String.fromCharCode(picture.data[ i ]);
            }
            var imageUri = "data:" + picture.format + ";base64," + window.btoa(base64String)

            var imgg = new Image;
            imgg.src = imageUri;
            document.getElementById("infoimg").innerHTML = ` <img src=${imageUri} class = "img-thumbnail">`;


            info.innerHTML = `<div>
			<ul class="list-group">
			<li class="list-group-item"><strong>Title: 	${tag.tags.title} </strong></li>
			<li class="list-group-item"><strong>Artist: ${tag.tags.artist}</strong></li>
			<li class="list-group-item"><strong>Album: 	${tag.tags.album} </strong></li>
			<li class="list-group-item"><strong>Genre: 	${tag.tags.genre} </strong></li>
			</ul>
			</div>`;

            let searchUrl = `${tracksearch}${tag.tags.title}&artist=${tag.tags.artist}&api_key=${apikey}&format=json`;
            console.log(searchUrl);

            axios.get(searchUrl)
                .then((response) =>
                {
                    console.log("data retrieving successful");
                    let songs = response.data.results.trackmatches.track;
                    console.log(songs);
                    let output = `
				<div class="container">
				<table class="table  table-bordered table-hover table-condensed">
				<tr>
				<th>image</th>
				<th>Track</th>
				<th>Artist</th>
				<th>Url</th>
				</tr>
				`;

                    $.each(songs, (indexp, song) =>
                    {
                        output += `
					<tr >
					<td>
					<img src="${song.image[ 1 ][ '#text' ]}"  alt="Responsive image">
					</td>
					<td>${song.name}</td>
					<td>${song.artist}</td>
					<td>
					<a class="btn btn-md btn-primary btn-success" role="btn" href="${song.url}">click me</a></td>
					</tr>`;
                    });
                    output += ` </table></div> `;
                    $('#songs').html(output);


                })

        },
        onError: function (error)
        {
            console.log(error);
        }
    })
})
