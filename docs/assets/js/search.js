// Search Functionality
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (!searchInput || !searchButton) return;

    // Search data (in production, this would be generated from the book content)
    const searchData = [
      { title: 'はじめに', url: '/introduction/', content: 'ゲームから始まる本格的な経営学習' },
      { title: '第1章 ゲームで学ぶ経営の基本', url: '/chapters/chapter01', content: '経営とは何か、なぜゲームが学習に有効か' },
      { title: '第2章 店舗設計と顧客導線', url: '/chapters/chapter02', content: '効率的なオペレーション設計' },
      { title: '第3章 仕入れと在庫の科学', url: '/chapters/chapter03', content: 'サプライチェーン管理と需要予測' },
      { title: '第4章 価格戦略の考え方', url: '/chapters/chapter04', content: 'プライシング戦略と競争分析' },
      { title: '第5章 顧客満足度の管理', url: '/chapters/chapter05', content: 'カスタマーエクスペリエンス' },
      { title: '第6章 成長戦略と投資判断', url: '/chapters/chapter06', content: '投資判断の基準と成長戦略' },
      { title: '第7章 お金の流れを理解する', url: '/chapters/chapter07', content: '財務管理とキャッシュフロー' },
      { title: '第8章 データで経営を改善する', url: '/chapters/chapter08', content: 'データドリブン経営とKPI管理' },
      { title: '第9章 現実世界のビジネスへ', url: '/chapters/chapter09', content: '学習内容を実社会に応用' },
      { title: '付録A 計算式集', url: '/appendices/appendix-a', content: '基本的な計算式一覧' },
      { title: '付録B 用語集', url: '/appendices/appendix-b', content: '経営用語の解説' },
      { title: '付録C 参考文献', url: '/appendices/appendix-c', content: '推薦図書と参考資料' }
    ];

    // Create search results container
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results';
    searchResultsContainer.style.display = 'none';
    searchInput.parentElement.appendChild(searchResultsContainer);

    // Search function
    function performSearch(query) {
      if (!query || query.length < 2) {
        searchResultsContainer.style.display = 'none';
        return;
      }

      const results = searchData.filter(item => {
        const searchText = (item.title + ' ' + item.content).toLowerCase();
        return searchText.includes(query.toLowerCase());
      });

      displayResults(results, query);
    }

    // Display search results
    function displayResults(results, query) {
      if (results.length === 0) {
        searchResultsContainer.innerHTML = '<div class="no-results">検索結果が見つかりませんでした</div>';
      } else {
        const resultsHTML = results.map(item => {
          const baseUrl = document.querySelector('base')?.href || '';
          const fullUrl = baseUrl + item.url;
          return `
            <a href="${fullUrl}" class="search-result-item">
              <div class="search-result-title">${highlightText(item.title, query)}</div>
              <div class="search-result-content">${highlightText(item.content, query)}</div>
            </a>
          `;
        }).join('');
        
        searchResultsContainer.innerHTML = resultsHTML;
      }
      
      searchResultsContainer.style.display = 'block';
    }

    // Highlight search query in results
    function highlightText(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    // Event listeners
    searchInput.addEventListener('input', function() {
      const query = this.value.trim();
      performSearch(query);
    });

    searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      performSearch(query);
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchInput.parentElement.contains(e.target)) {
        searchResultsContainer.style.display = 'none';
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
      
      // ESC to close search results
      if (e.key === 'Escape' && searchResultsContainer.style.display === 'block') {
        searchResultsContainer.style.display = 'none';
        searchInput.blur();
      }
    });
  });
})();