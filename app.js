// Sample synonym map (can be expanded or fetched from backend)
const synonyms = {
  soap: ["detergent", "cleanser", "bar"],
  meat: ["protein", "beef", "chicken"],
  phone: ["mobile", "cell", "smartphone"]
};

// Load JSON data
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const input = document.getElementById("search");
    const results = document.getElementById("results");

    input.addEventListener("input", () => {
      const query = input.value.toLowerCase().trim();
      results.innerHTML = "";

      if (!query) return;

      // Autocomplete suggestions (basic)
      const suggestions = data
        .map(item => item.title)
        .filter(title => title.toLowerCase().startsWith(query))
        .slice(0, 5);

      // Synonym expansion
      const expandedTerms = [query];
      Object.entries(synonyms).forEach(([key, values]) => {
        if (query.includes(key) || values.includes(query)) {
          expandedTerms.push(...values);
        }
      });

      // Regex pattern (e.g. match partial words)
      const regex = new RegExp(expandedTerms.join("|"), "i");

      // Fuzzy matching (basic Levenshtein distance)
      const fuzzyMatch = (a, b) => {
        const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
        for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
        for (let i = 1; i <= b.length; i++) {
          for (let j = 1; j <= a.length; j++) {
            const cost = a[j - 1] === b[i - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + cost
            );
          }
        }
        return matrix[b.length][a.length];
      };

      // Filter and rank results
      const filtered = data
        .map(item => {
          const title = item.title.toLowerCase();
          const fuzzyScore = fuzzyMatch(title, query);
          const regexMatch = regex.test(title);
          return { ...item, fuzzyScore, regexMatch };
        })
        .filter(item => item.fuzzyScore <= 3 || item.regexMatch)
        .sort((a, b) => a.fuzzyScore - b.fuzzyScore);

      // Display results
      filtered.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
  <div class="product-card">
    <img src="${item.image}" alt="${item.title}" class="product-image" />
    <div class="product-info">
      <a href="${item.link}" target="_blank">${item.title}</a>
      <p>${item.price}</p>
    </div>
  </div>
`;

        results.appendChild(li);
      });

      // Optional: show autocomplete suggestions
      console.log("Suggestions:", suggestions);
    });
  });
