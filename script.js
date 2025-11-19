// Sorting Algorithms
let currentAlgo = 'bubble';
let sortSteps = [];
let currentStep = 0;

// Algorithm implementations
const algorithms = {
    bubble: (arr) => {
        const steps = [arr.slice()];
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    steps.push(arr.slice());
                }
            }
        }
        return steps;
    },
    
    selection: (arr) => {
        const steps = [arr.slice()];
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                steps.push(arr.slice());
            }
        }
        return steps;
    },
    
    insertion: (arr) => {
        const steps = [arr.slice()];
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
            steps.push(arr.slice());
        }
        return steps;
    },
    
    merge: (arr) => {
        const steps = [arr.slice()];
        
        function mergeSort(arr, left, right) {
            if (left >= right) return;
            const mid = Math.floor((left + right) / 2);
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            
            // Merge
            const temp = [];
            let i = left, j = mid + 1;
            while (i <= mid && j <= right) {
                if (arr[i] <= arr[j]) temp.push(arr[i++]);
                else temp.push(arr[j++]);
            }
            while (i <= mid) temp.push(arr[i++]);
            while (j <= right) temp.push(arr[j++]);
            
            for (let k = 0; k < temp.length; k++) {
                arr[left + k] = temp[k];
            }
            steps.push(arr.slice());
        }
        
        mergeSort(arr, 0, arr.length - 1);
        return steps;
    },
    
    quick: (arr) => {
        const steps = [arr.slice()];
        
        function quickSort(arr, left, right) {
            if (left >= right) return;
            
            // Partition
            const pivot = arr[right];
            let i = left - 1;
            
            for (let j = left; j < right; j++) {
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
            const pivotIdx = i + 1;
            
            steps.push(arr.slice());
            
            quickSort(arr, left, pivotIdx - 1);
            quickSort(arr, pivotIdx + 1, right);
        }
        
        quickSort(arr, 0, arr.length - 1);
        return steps;
    }
};

// Initialize sorting
document.querySelectorAll('.algo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAlgo = btn.dataset.algo;
    });
});

document.getElementById('sort-btn').addEventListener('click', () => {
    const input = document.getElementById('sort-input').value;
    const arr = input.split(' ').map(Number).filter(n => !isNaN(n));
    if (arr.length === 0) {
        alert('Please enter valid numbers!');
        return;
    }
    
    sortSteps = algorithms[currentAlgo](arr.slice());
    currentStep = 0;
    displaySortStep(0);
    displaySortSteps();
});

document.getElementById('sort-reset').addEventListener('click', () => {
    const input = document.getElementById('sort-input').value;
    const arr = input.split(' ').map(Number).filter(n => !isNaN(n));
    if (arr.length > 0) {
        displayArray(arr);
    }
    sortSteps = [];
    currentStep = 0;
    document.getElementById('sort-steps').innerHTML = '';
});

function displayArray(arr, activeIndices = [], sortedIndices = []) {
    const container = document.getElementById('sort-visualization');
    container.innerHTML = '';
    
    const maxVal = Math.max(...arr);
    const minVal = Math.min(...arr);
    const range = maxVal - minVal || 1;
    
    arr.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${((val - minVal) / range) * 250 + 50}px`;
        bar.textContent = val;
        
        if (activeIndices.includes(idx)) {
            bar.classList.add('active');
        }
        if (sortedIndices.includes(idx)) {
            bar.classList.add('sorted');
        }
        
        container.appendChild(bar);
    });
}

function displaySortStep(stepIdx) {
    if (stepIdx >= sortSteps.length) return;
    const arr = sortSteps[stepIdx];
    displayArray(arr);
}

function displaySortSteps() {
    const container = document.getElementById('sort-steps');
    container.innerHTML = '<h3>Sorting Steps:</h3>';
    
    sortSteps.forEach((step, idx) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.textContent = `Step ${idx}: [${step.join(', ')}]`;
        stepDiv.addEventListener('click', () => displaySortStep(idx));
        stepDiv.style.cursor = 'pointer';
        container.appendChild(stepDiv);
    });
}

// Linked List
let llHead = null;

class LLNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

document.getElementById('ll-create').addEventListener('click', () => {
    const input = document.getElementById('ll-input').value;
    const values = input.split(' ').map(Number).filter(n => !isNaN(n));
    
    llHead = null;
    if (values.length > 0) {
        llHead = new LLNode(values[0]);
        let current = llHead;
        for (let i = 1; i < values.length; i++) {
            current.next = new LLNode(values[i]);
            current = current.next;
        }
    }
    
    visualizeLinkedList();
    document.getElementById('ll-result').innerHTML = '';
});

document.getElementById('ll-delete').addEventListener('click', () => {
    if (!llHead) {
        alert('Please create a list first!');
        return;
    }
    
    const val = parseInt(document.getElementById('ll-delete-val').value);
    if (isNaN(val)) {
        alert('Please enter a valid value to delete!');
        return;
    }
    
    llHead = deleteValue(llHead, val);
    visualizeLinkedList();
    document.getElementById('ll-result').innerHTML = 
        `<h3>Delete Operation</h3><p>Deleted first occurrence of value ${val}</p>`;
});

document.getElementById('ll-reverse').addEventListener('click', () => {
    if (!llHead) {
        alert('Please create a list first!');
        return;
    }
    
    llHead = reverseList(llHead);
    visualizeLinkedList();
    document.getElementById('ll-result').innerHTML = 
        `<h3>Reverse Operation</h3><p>List has been reversed</p>`;
});

document.getElementById('ll-check-cycle').addEventListener('click', () => {
    if (!llHead) {
        alert('Please create a list first!');
        return;
    }
    
    const hasCycle = checkCycle(llHead);
    document.getElementById('ll-result').innerHTML = 
        `<h3>Cycle Detection</h3><p>The list is ${hasCycle ? '<strong style="color: var(--accent-color);">CIRCULAR</strong>' : '<strong style="color: var(--secondary-color);">NOT CIRCULAR</strong>'}</p>`;
});

function deleteValue(head, val) {
    if (!head) return null;
    
    // If head needs to be deleted
    if (head.val === val) {
        return head.next;
    }
    
    let current = head;
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
            return head;
        }
        current = current.next;
    }
    
    return head;
}

function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

function checkCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}

function visualizeLinkedList() {
    const container = document.getElementById('ll-visualization');
    container.innerHTML = '<h3>Linked List Visualization</h3>';
    
    if (!llHead) {
        container.innerHTML += '<p>No list. Enter values and click Create List.</p>';
        return;
    }
    
    let html = '<div style="display: flex; align-items: center; flex-wrap: wrap;">';
    let current = llHead;
    let visited = new Set();
    let isCycle = false;
    
    while (current) {
        if (visited.has(current)) {
            isCycle = true;
            html += `<div class="ll-node cycle">${current.val}</div>`;
            html += '<div style="color: var(--accent-color); font-weight: bold;">(Cycle detected!)</div>';
            break;
        }
        
        visited.add(current);
        html += `<div class="ll-node">${current.val}</div>`;
        current = current.next;
    }
    
    if (!isCycle) {
        html += '<div style="margin-left: 0.5rem; color: var(--text-color);">null</div>';
    }
    
    html += '</div>';
    container.innerHTML += html;
}

// Graph Algorithms
let graph = null;

document.getElementById('graph-create').addEventListener('click', () => {
    const edgesText = document.getElementById('graph-edges').value;
    const lines = edgesText.trim().split('\n');
    
    graph = { nodes: new Set(), edges: [] };
    
    lines.forEach(line => {
        const parts = line.split(',').map(s => s.trim());
        if (parts.length >= 2) {
            const u = parseInt(parts[0]);
            const v = parseInt(parts[1]);
            const w = parts.length >= 3 ? parseInt(parts[2]) : 1;
            
            if (!isNaN(u) && !isNaN(v)) {
                graph.nodes.add(u);
                graph.nodes.add(v);
                graph.edges.push({ from: u, to: v, weight: w });
            }
        }
    });
    
    visualizeGraph();
});

function visualizeGraph() {
    const container = document.getElementById('graph-visualization');
    container.innerHTML = '<h3>Graph Visualization</h3>';
    
    if (!graph || graph.edges.length === 0) {
        container.innerHTML += '<p>No graph created. Enter edges above.</p>';
        return;
    }
    
    const nodes = Array.from(graph.nodes).sort((a, b) => a - b);
    container.innerHTML += `<p><strong>Nodes:</strong> ${nodes.join(', ')}</p>`;
    container.innerHTML += '<p><strong>Edges:</strong></p><ul>';
    
    graph.edges.forEach(edge => {
        container.innerHTML += `<li>${edge.from} → ${edge.to} (weight: ${edge.weight})</li>`;
    });
    
    container.innerHTML += '</ul>';
}

document.getElementById('graph-bfs').addEventListener('click', () => {
    if (!graph) {
        alert('Please create a graph first!');
        return;
    }
    
    const start = parseInt(document.getElementById('graph-start').value);
    if (isNaN(start)) {
        alert('Please enter a valid start vertex!');
        return;
    }
    
    const result = bfs(graph, start);
    document.getElementById('graph-result').innerHTML = 
        `<h3>BFS Result</h3><p>Visit order: ${result.join(' → ')}</p>`;
});

document.getElementById('graph-dfs').addEventListener('click', () => {
    if (!graph) {
        alert('Please create a graph first!');
        return;
    }
    
    const start = parseInt(document.getElementById('graph-start').value);
    if (isNaN(start)) {
        alert('Please enter a valid start vertex!');
        return;
    }
    
    const result = dfs(graph, start);
    document.getElementById('graph-result').innerHTML = 
        `<h3>DFS Result</h3><p>Visit order: ${result.join(' → ')}</p>`;
});

document.getElementById('graph-dijkstra').addEventListener('click', () => {
    if (!graph) {
        alert('Please create a graph first!');
        return;
    }
    
    const start = parseInt(document.getElementById('graph-start').value);
    if (isNaN(start)) {
        alert('Please enter a valid start vertex!');
        return;
    }
    
    const dists = dijkstra(graph, start);
    const nodes = Array.from(graph.nodes).sort((a, b) => a - b);
    
    let html = '<h3>Dijkstra Result</h3><p>Distances from vertex ' + start + ':</p><ul>';
    nodes.forEach(node => {
        const dist = dists[node];
        html += `<li>Vertex ${node}: ${dist === Infinity ? 'INF' : dist}</li>`;
    });
    html += '</ul>';
    
    document.getElementById('graph-result').innerHTML = html;
});

function bfs(graph, start) {
    const adj = {};
    graph.edges.forEach(edge => {
        if (!adj[edge.from]) adj[edge.from] = [];
        adj[edge.from].push(edge.to);
    });
    
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);
        
        if (adj[u]) {
            adj[u].forEach(v => {
                if (!visited.has(v)) {
                    visited.add(v);
                    queue.push(v);
                }
            });
        }
    }
    
    return result;
}

function dfs(graph, start) {
    const adj = {};
    graph.edges.forEach(edge => {
        if (!adj[edge.from]) adj[edge.from] = [];
        adj[edge.from].push(edge.to);
    });
    
    const visited = new Set();
    const result = [];
    
    function dfsHelper(u) {
        visited.add(u);
        result.push(u);
        
        if (adj[u]) {
            adj[u].forEach(v => {
                if (!visited.has(v)) {
                    dfsHelper(v);
                }
            });
        }
    }
    
    dfsHelper(start);
    return result;
}

function dijkstra(graph, start) {
    const adj = {};
    graph.edges.forEach(edge => {
        if (!adj[edge.from]) adj[edge.from] = [];
        adj[edge.from].push({ to: edge.to, weight: edge.weight });
    });
    
    const dist = {};
    const nodes = Array.from(graph.nodes);
    nodes.forEach(node => dist[node] = Infinity);
    dist[start] = 0;
    
    const pq = [{ node: start, dist: 0 }];
    
    while (pq.length > 0) {
        pq.sort((a, b) => a.dist - b.dist);
        const { node: u, dist: d } = pq.shift();
        
        if (d > dist[u]) continue;
        
        if (adj[u]) {
            adj[u].forEach(({ to: v, weight: w }) => {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({ node: v, dist: dist[v] });
                }
            });
        }
    }
    
    return dist;
}

// String Algorithms
document.getElementById('palindrome-btn').addEventListener('click', () => {
    const str = document.getElementById('palindrome-input').value;
    if (!str) {
        alert('Please enter a string!');
        return;
    }
    
    const result = isPalindrome(str);
    document.getElementById('palindrome-result').innerHTML = 
        `<h3>Palindrome Check</h3><p>"${str}" is ${result ? '<strong style="color: var(--secondary-color);">a palindrome</strong>' : '<strong style="color: var(--accent-color);">not a palindrome</strong>'}</p>`;
});

document.getElementById('lcs-btn').addEventListener('click', () => {
    const str1 = document.getElementById('lcs-str1').value;
    const str2 = document.getElementById('lcs-str2').value;
    
    if (!str1 || !str2) {
        alert('Please enter both strings!');
        return;
    }
    
    const length = lcsLength(str1, str2);
    document.getElementById('lcs-result').innerHTML = 
        `<h3>LCS Length</h3><p>String 1: "${str1}"</p><p>String 2: "${str2}"</p><p>LCS Length: <strong>${length}</strong></p>`;
});

function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

function lcsLength(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    
    // Create DP table
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Stack & Queue
document.getElementById('paren-btn').addEventListener('click', () => {
    const str = document.getElementById('paren-input').value;
    if (!str) {
        alert('Please enter a string!');
        return;
    }
    
    const result = parenthesesBalanced(str);
    document.getElementById('paren-result').innerHTML = 
        `<h3>Parentheses Balance Check</h3><p>"${str}" is ${result ? '<strong style="color: var(--secondary-color);">balanced</strong>' : '<strong style="color: var(--accent-color);">not balanced</strong>'}</p>`;
});

function parenthesesBalanced(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for (let char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
                return false;
            }
            stack.pop();
        }
    }
    
    return stack.length === 0;
}

// Binary Search
document.getElementById('bs-btn').addEventListener('click', () => {
    const input = document.getElementById('bs-input').value;
    const arr = input.split(' ').map(Number).filter(n => !isNaN(n));
    const key = parseInt(document.getElementById('bs-key').value);
    
    if (arr.length === 0) {
        alert('Please enter valid numbers!');
        return;
    }
    
    if (isNaN(key)) {
        alert('Please enter a valid key!');
        return;
    }
    
    // Sort array if not sorted
    const sorted = [...arr].sort((a, b) => a - b);
    const index = binarySearch(sorted, key);
    
    let resultHtml = `<h3>Binary Search Result</h3>`;
    resultHtml += `<p>Array: [${sorted.join(', ')}]</p>`;
    resultHtml += `<p>Key: ${key}</p>`;
    
    if (index === -1) {
        resultHtml += `<p>Result: Key <strong style="color: var(--accent-color);">not found</strong></p>`;
    } else {
        resultHtml += `<p>Result: Key found at index <strong style="color: var(--secondary-color);">${index}</strong></p>`;
    }
    
    document.getElementById('bs-result').innerHTML = resultHtml;
});

function binarySearch(arr, key) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === key) {
            return mid;
        } else if (arr[mid] < key) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// BST
let bstRoot = null;

class BSTNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

document.getElementById('bst-build').addEventListener('click', () => {
    const input = document.getElementById('bst-input').value;
    const values = input.split(' ').map(Number).filter(n => !isNaN(n));
    
    bstRoot = null;
    values.forEach(val => {
        bstRoot = insertBST(bstRoot, val);
    });
    
    visualizeBST();
});

function insertBST(root, val) {
    if (!root) return new BSTNode(val);
    if (val < root.val) root.left = insertBST(root.left, val);
    else if (val > root.val) root.right = insertBST(root.right, val);
    return root;
}

function visualizeBST() {
    const container = document.getElementById('bst-visualization');
    container.innerHTML = '<h3>BST Structure</h3>';
    
    if (!bstRoot) {
        container.innerHTML += '<p>No tree. Enter values and click Build Tree.</p>';
        return;
    }
    
    function printTree(node, prefix = '', isLeft = true) {
        if (!node) return '';
        let result = prefix + (isLeft ? '├── ' : '└── ') + node.val + '\n';
        if (node.left || node.right) {
            result += printTree(node.right, prefix + (isLeft ? '│   ' : '    '), false);
            result += printTree(node.left, prefix + (isLeft ? '    ' : '│   '), true);
        }
        return result;
    }
    
    container.innerHTML += '<pre>' + printTree(bstRoot) + '</pre>';
}

// BST Operations
document.getElementById('bst-insert').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const val = parseInt(document.getElementById('bst-insert-val').value);
    if (isNaN(val)) {
        alert('Please enter a valid value!');
        return;
    }
    bstRoot = insertBST(bstRoot, val);
    visualizeBST();
    document.getElementById('bst-result').innerHTML = 
        `<h3>Insert Operation</h3><p>Value ${val} inserted successfully</p>`;
    document.getElementById('bst-insert-val').value = '';
});

document.getElementById('bst-delete').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const val = parseInt(document.getElementById('bst-delete-val').value);
    if (isNaN(val)) {
        alert('Please enter a valid value!');
        return;
    }
    bstRoot = deleteBST(bstRoot, val);
    visualizeBST();
    document.getElementById('bst-result').innerHTML = 
        `<h3>Delete Operation</h3><p>Value ${val} deleted</p>`;
    document.getElementById('bst-delete-val').value = '';
});

document.getElementById('bst-search').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const val = parseInt(document.getElementById('bst-search-val').value);
    if (isNaN(val)) {
        alert('Please enter a valid value!');
        return;
    }
    const found = searchBST(bstRoot, val);
    document.getElementById('bst-result').innerHTML = 
        `<h3>Search Operation</h3><p>Value ${val} is ${found ? '<strong style="color: var(--secondary-color);">found</strong>' : '<strong style="color: var(--accent-color);">not found</strong>'}</p>`;
    document.getElementById('bst-search-val').value = '';
});

document.getElementById('bst-height').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const h = heightBST(bstRoot);
    document.getElementById('bst-result').innerHTML = 
        `<h3>Tree Height</h3><p>Height: <strong>${h}</strong></p>`;
});

// BST Traversals
document.getElementById('bst-inorder-rec').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const result = [];
    inorder(bstRoot, result);
    document.getElementById('bst-result').innerHTML = 
        `<h3>Inorder Traversal (Recursive)</h3><p>${result.join(' → ')}</p>`;
});

document.getElementById('bst-preorder-rec').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const result = [];
    preorder(bstRoot, result);
    document.getElementById('bst-result').innerHTML = 
        `<h3>Preorder Traversal (Recursive)</h3><p>${result.join(' → ')}</p>`;
});

document.getElementById('bst-postorder-rec').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const result = [];
    postorder(bstRoot, result);
    document.getElementById('bst-result').innerHTML = 
        `<h3>Postorder Traversal (Recursive)</h3><p>${result.join(' → ')}</p>`;
});

document.getElementById('bst-inorder-iter').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const result = inorderIterative(bstRoot);
    document.getElementById('bst-result').innerHTML = 
        `<h3>Inorder Traversal (Iterative)</h3><p>${result.join(' → ')}</p>`;
});

document.getElementById('bst-preorder-iter').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const result = preorderIterative(bstRoot);
    document.getElementById('bst-result').innerHTML = 
        `<h3>Preorder Traversal (Iterative)</h3><p>${result.join(' → ')}</p>`;
});

document.getElementById('bst-postorder-iter').addEventListener('click', () => {
    if (!bstRoot) {
        alert('Please build a tree first!');
        return;
    }
    const result = postorderIterative(bstRoot);
    document.getElementById('bst-result').innerHTML = 
        `<h3>Postorder Traversal (Iterative)</h3><p>${result.join(' → ')}</p>`;
});

function inorder(node, result) {
    if (!node) return;
    inorder(node.left, result);
    result.push(node.val);
    inorder(node.right, result);
}

function preorder(node, result) {
    if (!node) return;
    result.push(node.val);
    preorder(node.left, result);
    preorder(node.right, result);
}

function postorder(node, result) {
    if (!node) return;
    postorder(node.left, result);
    postorder(node.right, result);
    result.push(node.val);
}

// BST Helper Functions
function findMinBST(root) {
    while (root && root.left) {
        root = root.left;
    }
    return root;
}

function deleteBST(root, val) {
    if (!root) return null;
    
    if (val < root.val) {
        root.left = deleteBST(root.left, val);
    } else if (val > root.val) {
        root.right = deleteBST(root.right, val);
    } else {
        // Node to delete found
        if (!root.left) {
            return root.right;
        } else if (!root.right) {
            return root.left;
        } else {
            // Node with two children
            const temp = findMinBST(root.right);
            root.val = temp.val;
            root.right = deleteBST(root.right, temp.val);
        }
    }
    
    return root;
}

function searchBST(root, val) {
    if (!root || root.val === val) {
        return root !== null;
    }
    
    if (val < root.val) {
        return searchBST(root.left, val);
    } else {
        return searchBST(root.right, val);
    }
}

function heightBST(root) {
    if (!root) return -1;
    return 1 + Math.max(heightBST(root.left), heightBST(root.right));
}

function inorderIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    
    return result;
}

function preorderIterative(root) {
    const result = [];
    if (!root) return result;
    
    const stack = [root];
    
    while (stack.length > 0) {
        const current = stack.pop();
        result.push(current.val);
        
        if (current.right) stack.push(current.right);
        if (current.left) stack.push(current.left);
    }
    
    return result;
}

function postorderIterative(root) {
    const result = [];
    if (!root) return result;
    
    const stack1 = [root];
    const stack2 = [];
    
    while (stack1.length > 0) {
        const current = stack1.pop();
        stack2.push(current);
        
        if (current.left) stack1.push(current.left);
        if (current.right) stack1.push(current.right);
    }
    
    while (stack2.length > 0) {
        result.push(stack2.pop().val);
    }
    
    return result;
}

// Knapsack
document.getElementById('knap-solve').addEventListener('click', () => {
    const weights = document.getElementById('knap-weights').value.split(' ').map(Number).filter(n => !isNaN(n));
    const values = document.getElementById('knap-values').value.split(' ').map(Number).filter(n => !isNaN(n));
    const W = parseInt(document.getElementById('knap-capacity').value);
    
    if (weights.length !== values.length) {
        alert('Weights and values must have the same length!');
        return;
    }
    
    if (isNaN(W) || W <= 0) {
        alert('Please enter a valid capacity!');
        return;
    }
    
    const result = knapsack01(weights, values, W);
    document.getElementById('knap-result').innerHTML = 
        `<h3>Result</h3><p>Maximum value: <strong>${result}</strong></p>`;
    
    displayKnapsackTable(weights, values, W);
});

function knapsack01(wt, val, W) {
    const n = wt.length;
    const dp = new Array(W + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        for (let w = W; w >= wt[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    
    return dp[W];
}

function displayKnapsackTable(weights, values, W) {
    const container = document.getElementById('knap-table');
    const n = weights.length;
    const dp = new Array(n + 1).fill(null).map(() => new Array(W + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    let html = '<h3>DP Table</h3><table><thead><tr><th>Item/Weight</th>';
    for (let w = 0; w <= W; w++) {
        html += `<th>${w}</th>`;
    }
    html += '</tr></thead><tbody>';
    
    for (let i = 0; i <= n; i++) {
        html += '<tr>';
        if (i === 0) {
            html += '<th>0</th>';
        } else {
            html += `<th>${i} (w:${weights[i-1]}, v:${values[i-1]})</th>`;
        }
        for (let w = 0; w <= W; w++) {
            html += `<td>${dp[i][w]}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

