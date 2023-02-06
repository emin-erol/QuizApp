function Soru(soruMetni, cevaplar, dogruCevap) {
  this.soruMetni = soruMetni;
  this.cevaplar = cevaplar;
  this.dogruCevap = dogruCevap;
}

Soru.prototype.cevapKontrolu = function (cevap) {
  return cevap === this.dogruCevap;
};

let sorular = [
  new Soru(
    "1. Hangisi bir programlama dili değildir?",
    { A: "PHP", B: "HTML", C: "JavaScript", D: "Python" },
    "B"
  ),
  new Soru(
    "2. Hangisi nesne tabanlı programlama dili değildir?",
    { A: "Python", B: "Java", C: "C", D: "JavaScript" },
    "C"
  ),
  new Soru(
    "3. Hangi programlama dili daha eskidir?",
    { A: "Assembly", B: "Pascal", C: "C", D: "Java" },
    "A"
  ),
  new Soru(
    "4. Hangisi Microsoft'un geliştirdiği bir programlama dilidir?",
    { A: "Java", B: "C#", C: "R", D: "Python" },
    "B"
  ),
  new Soru(
    "5. Hangisi C dilinde konsola 'Hello World!' yazdırma komutudur?",
    {
      A: 'printf("Hello World!")',
      B: 'print("Hello World!")',
      C: 'println("Hello World!")',
      D: "printf(Hello World!)",
    },
    "A"
  ),
  new Soru(
    "6. Hangi sorgu ifadesinin kullanımı doğrudur?",
    { A: "if(a = 5)", B: "if(a)", C: "if(a =! 0)", D: "if(a >> 10)" },
    "B"
  ),
];
