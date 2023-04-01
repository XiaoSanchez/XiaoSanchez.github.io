(function($) { "use strict";

	$(function() {
		var header = $(".start-style");
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 10) {
				header.removeClass('start-style').addClass("scroll-on");
			} else {
				header.removeClass("scroll-on").addClass('start-style');
			}
		});
	});		
		
	//Animation
	
	$(document).ready(function() {
		$('body.hero-anime').removeClass('hero-anime');
	});

	//Menu On Hover
		
	$('body').on('mouseenter mouseleave','.nav-item',function(e){
			if ($(window).width() > 750) {
				var _d=$(e.target).closest('.nav-item');_d.addClass('show');
				setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
				},1);
			}
	});	
	
	//Switch light/dark
	
	$("#switch").on('click', function () {
		if ($("body").hasClass("dark")) {
			$("body").removeClass("dark");
			$("#switch").removeClass("switched");
		}
		else {
			$("body").addClass("dark");
			$("#switch").addClass("switched");
		}
	});  
	
  })(jQuery);

  
  // nav-link scrolling
  $('.nav-link').on('click',function (e) {
	e.preventDefault();

	var target = this.hash,
	$target = $(target);

	$('html, body').stop().animate({
		'scrollTop': $target.offset().top
	}, 800, 'swing', function () {
		window.location.hash = target;
	});
});

// GitHub API endpoint for fetching repository data
const API_URL = "https://api.github.com/repos/";

// Repositories to display
const repos = [
	"https://github.com/XiaoSanchez/Facial_Expression_Recognition",
	"https://github.com/XiaoSanchez/Bootstrap_C-Based_Compiler",
	"https://github.com/XiaoSanchez/Car_Dealership_Reviews",
];

// Function to fetch repository data from GitHub API
async function fetchRepoData(repoUrl) {
	const repoName = repoUrl.split("/").slice(-2).join("/");
	const response = await fetch(API_URL + repoName);
	const repoData = await response.json();
	return repoData;
}

// Function to generate HTML content for a repository
function generateRepoHtml(repoData) {
	const repoUrl = repoData.html_url;
	const repoName = repoData.name;
	const repoDescription = repoData.description;
	const repoStars = repoData.stargazers_count;
	const repoForks = repoData.forks_count;
	const repoLanguage = repoData.language;

	const repoHtml = `
	<div class="repo-card" style="height:220px; width: 40%; padding: 10px;">
		<a href="${repoUrl}">${repoName}</a>
		<p>${repoDescription}</p>
		<ul>
		<p>Stars: ${repoStars}&nbsp;&nbsp;&nbsp;&nbsp;Forks: ${repoForks}</p>
		<p>Language: ${repoLanguage}</p>
		</ul>
	</div>
	`;
	return repoHtml;
}

// Function to display repositories on the page
async function displayRepos() {
	const repoContainer = document.getElementById("repo-container");
	for (const repoUrl of repos) {
	const repoData = await fetchRepoData(repoUrl);
	const repoHtml = generateRepoHtml(repoData);
	repoContainer.insertAdjacentHTML("beforeend", repoHtml);
	}
}

// Call the displayRepos function to start displaying repositories
displayRepos();