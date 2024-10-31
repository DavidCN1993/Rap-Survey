document.getElementById('survey-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get selected formidable rapper
  const formidableRapper = document.getElementById('dropdown').value;
  
  // Get all selected albums
  const selectedAlbums = Array.from(document.querySelectorAll('input[name="albums"]:checked'))
      .map(checkbox => checkbox.value);
  
  // Count albums by artist
  const albumCounts = {
      kendrick: selectedAlbums.filter(album => 
          ['damn', 'good-kid-maad-city', 'mr-morale'].includes(album)).length,
      cole: selectedAlbums.filter(album => 
          ['forest-hills-drive', 'kod', 'off-season'].includes(album)).length,
      drake: selectedAlbums.filter(album => 
          ['take-care', 'scorpion', 'her-loss'].includes(album)).length
  };
  
  // Find favorite based on album selection
  const maxAlbums = Math.max(...Object.values(albumCounts));
  const favoriteByAlbums = Object.entries(albumCounts)
      .filter(([_, count]) => count === maxAlbums)
      .map(([artist]) => artist);
  
  // Convert formidable rapper value to match albumCounts keys
  const formidableRapperKey = formidableRapper === 'kendrick-lamar' ? 'kendrick' :
      formidableRapper === 'j-cole' ? 'cole' : 'drake';
  
  // Generate analysis message
  let analysisMessage = '';
  const userName = document.getElementById('name').value;
  
  if (favoriteByAlbums.length > 1) {
      analysisMessage = `Interesting, ${userName}! Based on your album selections, you seem to equally enjoy ` +
          `${favoriteByAlbums.map(artist => artist.charAt(0).toUpperCase() + artist.slice(1)).join(' and ')} ` +
          `(${maxAlbums} albums each).\n\n`;
  } else {
      const favoriteArtist = favoriteByAlbums[0].charAt(0).toUpperCase() + favoriteByAlbums[0].slice(1);
      analysisMessage = `Interesting, ${userName}! Based on your album selections, you seem to favor ${favoriteArtist} ` +
          `the most (${maxAlbums} albums).\n\n`;
  }
  
  // Compare with formidable rapper selection
  if (favoriteByAlbums.includes(formidableRapperKey)) {
      analysisMessage += `Your album preferences align with your choice of most formidable rapper ` +
          `(${formidableRapper.replace('-', ' ')})!`;
  } else {
      analysisMessage += `Although you chose ${formidableRapper.replace('-', ' ')} as the most formidable rapper, ` +
          `your album selections suggest you might enjoy listening to ` +
          `${favoriteByAlbums.map(artist => artist.charAt(0).toUpperCase() + artist.slice(1)).join(' and ')} more.`;
  }
  
  // Create and show results
  const resultsDiv = document.createElement('div');
  resultsDiv.style.marginTop = '20px';
  resultsDiv.style.padding = '15px';
  resultsDiv.style.backgroundColor = '#f0f0f0';
  resultsDiv.style.borderRadius = '5px';
  resultsDiv.style.whiteSpace = 'pre-line';
  resultsDiv.textContent = analysisMessage;
  
  // Remove any existing results
  const existingResults = document.querySelector('.survey-results');
  if (existingResults) {
      existingResults.remove();
  }
  
  // Add results to page
  resultsDiv.className = 'survey-results';
  document.getElementById('survey-form').after(resultsDiv);
});

// Add simple form validation
document.querySelectorAll('input[required], select[required]').forEach(element => {
  element.addEventListener('invalid', function(e) {
      e.preventDefault();
      this.classList.add('invalid');
  });
  
  element.addEventListener('input', function() {
      this.classList.remove('invalid');
  });
});