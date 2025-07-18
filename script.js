 
const kmpBtn = document.getElementById('kmp-btn');
const rabinKarpBtn = document.getElementById('rabin-karp-btn');
const resultDiv = document.getElementById('result');
const visualizationDiv = document.getElementById('visualization');

kmpBtn.addEventListener('click', () => {
    const text = document.getElementById('text').value;
    const pattern = document.getElementById('pattern').value;
    const result = kmpSearch(text, pattern);
    resultDiv.innerHTML = `KMP Search Result: ${result}`;
    visualizeKMP(text, pattern);
});

rabinKarpBtn.addEventListener('click', () => {
    const text = document.getElementById('text').value;
    const pattern = document.getElementById('pattern').value;
    const result = rabinKarpSearch(text, pattern);
    resultDiv.innerHTML = `Rabin-Karp Search Result: ${result}`;
    visualizeRabinKarp(text, pattern);
});

function kmpSearch(text, pattern) {
    let lps = new Array(pattern.length).fill(0);
    let j = 0;
    for (let i = 1; i < pattern.length; i++) {
        if (pattern[i] === pattern[j]) {
            j++;
            lps[i] = j;
        } else {
            if (j !== 0) {
                j = lps[j - 1];
                i--;
            } else {
                lps[i] = 0;
            }
        }
    }
    j = 0;
    let result = [];
    for (let i = 0; i < text.length; i++) {
        if (text[i] === pattern[j]) {
            j++;
            if (j === pattern.length) {
                result.push(i - j + 1);
                j = lps[j - 1];
            }
        } else {
            if (j !== 0) {
                j = lps[j - 1];
                i--;
            }
        }
    }
    return result.length > 0 ? `Pattern found at indices: ${result.join(', ')}` : 'Pattern not found';
}

function rabinKarpSearch(text, pattern) {
    let d = 256;
    let q = 101;
    let patternHash = 0;
    let textHash = 0;
    let h = 1;
    for (let i = 0; i < pattern.length - 1; i++) {
        h = (h * d) % q;
    }
    for (let i = 0; i < pattern.length; i++) {
        patternHash = (d * patternHash + pattern.charCodeAt(i)) % q;
        textHash = (d * textHash + text.charCodeAt(i)) % q;
    }
    let result = [];
    for (let i = 0; i <= text.length - pattern.length; i++) {
        if (patternHash === textHash) {
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                result.push(i);
            }
        }
        if (i < text.length - pattern.length) {
            textHash = (d * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + pattern.length)) % q;
            if (textHash < 0) {
                textHash += q;
            }
        }
    }
    return result.length > 0 ? `Pattern found at indices: ${result.join(', ')}` : 'Pattern not found';
}

function visualizeKMP(text, pattern) {
    // Add visualization code here
    visualizationDiv.innerHTML = `Visualizing KMP search for pattern "${pattern}" in text "${text}"`;
}

function visualizeRabinKarp(text, pattern) {
    // Add visualization code here
    visualizationDiv.innerHTML = `Visualizing Rabin-Karp search for pattern "${pattern}" in text "${text}"`;
}