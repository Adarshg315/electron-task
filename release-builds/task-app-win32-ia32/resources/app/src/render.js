const config = require("./config");
var Twit = require("twit");
const T = new Twit(config);

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
