 #include <iostream>
#include <string>
using namespace std;

// KMP Algorithm
void computeLPSArray(string pattern, int M, int lps[]) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < M) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

void KMPSearch(string pattern, string text) {
    int M = pattern.length();
    int N = text.length();
    int lps[M];
    computeLPSArray(pattern, M, lps);
    int i = 0, j = 0;
    while (i < N) {
        if (pattern[j] == text[i]) {
            i++;
            j++;
        }
        if (j == M) {
            cout << "Pattern found at index " << i - j << endl;
            j = lps[j - 1];
        } else if (i < N && pattern[j] != text[i]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
}

// Rabin-Karp Algorithm
void RabinKarpSearch(string pattern, string text) {
    int d = 256;
    int q = 101;
    int M = pattern.length();
    int N = text.length();
    int i, j;
    int p = 0;
    int t = 0;
    int h = 1;
    for (i = 0; i < M - 1; i++) {
        h = (h * d) % q;
    }
    for (i = 0; i < M; i++) {
        p = (d * p + pattern[i]) % q;
        t = (d * t + text[i]) % q;
    }
    for (i = 0; i <= N - M; i++) {
        if (p == t) {
            for (j = 0; j < M; j++) {
                if (text[i + j] != pattern[j]) {
                    break;
                }
            }
            if (j == M) {
                cout << "Pattern found at index " << i << endl;
            }
        }
        if (i < N - M) {
            t = (d * (t - text[i] * h) + text[i + M]) % q;
            if (t < 0) {
                t += q;
            }
        }
    }
}

int main() {
    string text, pattern;
    cout << "Enter the text: ";
    cin >> text;
    cout << "Enter the pattern: ";
    cin >> pattern;
    cout << "KMP Search:" << endl;
    KMPSearch(pattern, text);
    cout << "Rabin-Karp Search:" << endl;
    RabinKarpSearch(pattern, text);
    return 0;
}

