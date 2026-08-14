(function () {
  "use strict";
  var input = document.querySelector("[data-search-input]");
  var results = document.querySelector("[data-search-results]");
  var status = document.querySelector("[data-search-status]");
  if (!input || !results) return;

  var categoryBase = results.dataset.categoryBase || "/categories/";

  var index = [];
  fetch(results.dataset.indexUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) { index = data; })
    .catch(function () { status.textContent = "Search index unavailable right now."; });

  function render(items, query) {
    results.innerHTML = "";
    if (!query) { status.textContent = ""; return; }
    status.textContent = items.length ? items.length + " result" + (items.length === 1 ? "" : "s") + " for “" + query + "”" : "No results for “" + query + "”.";
    items.forEach(function (item) {
      var el = document.createElement("article");
      el.className = "story-card";
      el.innerHTML =
        '<div class="story-card__media"><div class="media-plate media-plate--16x9 media-plate--navy"></div></div>' +
        '<div class="story-card__body">' +
        '<a class="eyebrow" href="' + categoryBase + item.category.toLowerCase() + '/">' + item.category + "</a>" +
        '<h3 class="story-card__title"><a href="' + item.url + '">' + item.title + "</a></h3>" +
        '<p class="story-card__summary">' + item.summary + "</p>" +
        '<div class="story-card__meta">' + (item.reporter ? "<span>" + item.reporter + "</span><span class=\"dot\">&middot;</span>" : "") + "<time>" + item.date + "</time></div>" +
        "</div>";
      results.appendChild(el);
    });
  }

  function search(query) {
    var q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter(function (item) {
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.reporter && item.reporter.toLowerCase().includes(q)) ||
        (item.tags || []).some(function (t) { return t.toLowerCase().includes(q); })
      );
    });
  }

  var timer;
  input.addEventListener("input", function () {
    clearTimeout(timer);
    var q = input.value;
    timer = setTimeout(function () { render(search(q), q.trim()); }, 150);
  });

  var params = new URLSearchParams(window.location.search);
  var initial = params.get("q");
  if (initial) {
    input.value = initial;
    setTimeout(function () { render(search(initial), initial); }, 300);
  }
})();
