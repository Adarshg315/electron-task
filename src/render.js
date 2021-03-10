const config = require("./config");
var Twit = require("twit");
const T = new Twit(config);
const axios = require("axios");

const params = {
	track: "-is:reply, -is:quote, -is:retweet -is:created",
	follow: "42606652",
};

const stream = T.stream("statuses/filter", params).on(
	"tweet",
	async (tweet) => {
		const tweetStream = document.getElementById("tweetStream");
		const tweetEl = document.createElement("div");
		tweetEl.className = "card my-4";
		tweetEl.innerHTML = `	
        <div class="card-body">
            <h5 class="card-title">${tweet.text}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${tweet.user.name}</h6>
            <a class="btn btn-primary mt-3" href="https://twitter.com/${tweet.user.name}/status/${tweet.id}">
                <i class="fab fa-twitter"></i> Go To Tweet    
            </a>
        </div>
    `;
		tweetStream.appendChild(tweetEl);
	}
);

const currentDate = new Date().toISOString();
const upcoming_match = [];

axios
	.get("https://cricapi.com/api/matches/?apikey=mfqBFEagKSV9l0fCjcC8mNr5HiI2")
	.then((res) => {
		res.data.matches.map((element) => {
			if (element.matchStarted) {
				if (element.date <= currentDate) {
					upcoming_match.push(element.unique_id);
				}
			}
		});

		upcoming_match.forEach((id) => {
			axios
				.get(
					`https://cricapi.com/api/cricketScore/?apikey=mfqBFEagKSV9l0fCjcC8mNr5HiI2&unique_id=${id}`
				)
				.then((res) => {
					console.log(res.data.score);
				});
		});
	});
