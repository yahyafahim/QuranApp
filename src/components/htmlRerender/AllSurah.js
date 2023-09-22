// import './mushaf.css';
const array = [
  {
    id: 1,
    name: 'Al-Fatihah',
    englishName: 'The Opening',
    ayahs: [
      {
        number: 1,
        text: `<!DOCTYPE html>
        <html lang="ar" xml:lang="ar" xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="mushaf.css" />
        </head>
        
        <body dir="rtl" style='font-size: calc(0.5vw + 1em);
        /*font-family: 'Noto Naskh Arabic UI';*/
        font-family: 'PakType Naskh Basic Wide', 'Noto Naskh Arabic UI';
        position: relative;' class="body">
            <section data-type="sura" data-place="Makkah" data-order="5" data-sura="1" data-mushaf="uthmani">
                <h1 data-name="الفَاتِحَةِ" style='  font-size: calc(2vw + 1em);
                font-family: 'PakType Naskh Basic Wide', 'Noto Naskh Arabic UI';' class="heading">
                    سُورَةُ الفَاتِحَةِ
                </h1>
               
                <span data-type="aaya" data-aaya="1" data-juz="1" data-manzil="1" data-hizb="1" data-sub-hizb="1">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِیمِ
                    <span data-type="eoa" class="eoAaya">۝١</span>
                </span>
                <span data-type="aaya" data-aaya="2" data-juz="1" data-manzil="1" data-hizb="1" data-sub-hizb="1">
                    ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِینَ
                    <span data-type="eoa" class="eoAaya">۝٢</span>
                </span>
                <span data-type="aaya" data-aaya="3" data-juz="1" data-manzil="1" data-hizb="1" data-sub-hizb="1">
                    ٱلرَّحۡمَٰنِ ٱلرَّحِیمِ
                    <span data-type="eoa" class="eoAaya">۝٣</span>
                </span>
                <span data-type="aaya" data-aaya="4" data-juz="1" data-manzil="1" data-hizb="1" data-sub-hizb="1">
                    مَٰلِكِ یَوۡمِ ٱلدِّینِ
                    <span data-type="eoa" class="eoAaya">۝٤</span>
                </span>
                <span data-type="aaya" data-aaya="5" data-juz="1" data-manzil="1" data-hizb="1" data-sub-hizb="1">
                    إِیَّاكَ نَعۡبُدُ وَإِیَّاكَ نَسۡتَعِینُ
                    <span data-type="eoa" class="eoAaya">۝٥</span>
                </span>
                <span data-type="aaya" data-aaya="6" data-juz="1" data-manzil="1" data-hizb="1" data-sub-hizb="1">
                    ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِیمَ
                    <span data-type="eoa" class="eoAaya">۝٦</span>
                </span>
                <span data-type="aaya" data-aaya="7" data-juz="1" data-manzil="1" data-hizb="1" data-sub-hizb="1">
                    صِرَٰطَ ٱلَّذِینَ أَنۡعَمۡتَ عَلَیۡهِمۡ غَیۡرِ ٱلۡمَغۡضُوبِ عَلَیۡهِمۡ وَلَا ٱلضَّآلِّینَ
                    <span data-type="eoa" class="eoAaya">۝٧</span>
                </span>
            </section>
            
        </body>  
        </html>`,
        numberInSurah: 1,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false,
      },
    ],
  },
];

export default {
  array,
};
