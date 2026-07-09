'use client';
// ╔══════════════════════════════════════════════════════════════╗
// ║   برنامج القرآن والصلاة والأذكار والختمة — YEMEN GROUP       ║
// ║   4 وظائف في برنامج واحد: قرآن · صلاة · أذكار · ختمة       ║
// ╚══════════════════════════════════════════════════════════════╝
import { useState, useEffect, useCallback } from 'react';
import { AppShell } from '@/components/layout/AppShell';

// ── أنواع البيانات ──────────────────────────────────────────────
type Tab      = 'quran' | 'prayer' | 'azkar' | 'khatma';
type AzkarCat = 'morning' | 'evening' | 'after' | 'general';
interface Surah { n: number; ar: string; en: string; v: number; j: number; mak: boolean }
interface Ayah  { n: number; text: string }
interface Zikr  { id: number; text: string; goal: number; note?: string }
interface JuzEntry { n: number; from: string; to: string }

// ── قائمة السور الكريمة (١١٤ سورة) ───────────────────────────────
const S: Surah[] = [
  {n:1,  ar:'الفاتحة',    en:'Al-Fatiha',       v:7,   j:1,  mak:true},
  {n:2,  ar:'البقرة',     en:'Al-Baqara',       v:286, j:1,  mak:false},
  {n:3,  ar:'آل عمران',   en:'Al-Imran',        v:200, j:3,  mak:false},
  {n:4,  ar:'النساء',     en:"An-Nisa'",        v:176, j:4,  mak:false},
  {n:5,  ar:'المائدة',    en:"Al-Ma'ida",       v:120, j:6,  mak:false},
  {n:6,  ar:'الأنعام',    en:"Al-An'am",        v:165, j:7,  mak:true},
  {n:7,  ar:'الأعراف',    en:"Al-A'raf",        v:206, j:8,  mak:true},
  {n:8,  ar:'الأنفال',    en:'Al-Anfal',        v:75,  j:9,  mak:false},
  {n:9,  ar:'التوبة',     en:'At-Tawba',        v:129, j:10, mak:false},
  {n:10, ar:'يونس',       en:'Yunus',           v:109, j:11, mak:true},
  {n:11, ar:'هود',        en:'Hud',             v:123, j:11, mak:true},
  {n:12, ar:'يوسف',       en:'Yusuf',           v:111, j:12, mak:true},
  {n:13, ar:'الرعد',      en:"Ar-Ra'd",         v:43,  j:13, mak:false},
  {n:14, ar:'إبراهيم',    en:'Ibrahim',         v:52,  j:13, mak:true},
  {n:15, ar:'الحجر',      en:'Al-Hijr',         v:99,  j:14, mak:true},
  {n:16, ar:'النحل',      en:'An-Nahl',         v:128, j:14, mak:true},
  {n:17, ar:'الإسراء',    en:"Al-Isra'",        v:111, j:15, mak:true},
  {n:18, ar:'الكهف',      en:'Al-Kahf',         v:110, j:15, mak:true},
  {n:19, ar:'مريم',       en:'Maryam',          v:98,  j:16, mak:true},
  {n:20, ar:'طه',         en:'Ta-Ha',           v:135, j:16, mak:true},
  {n:21, ar:'الأنبياء',   en:"Al-Anbiya'",      v:112, j:17, mak:true},
  {n:22, ar:'الحج',       en:'Al-Hajj',         v:78,  j:17, mak:false},
  {n:23, ar:'المؤمنون',   en:"Al-Mu'minun",     v:118, j:18, mak:true},
  {n:24, ar:'النور',      en:'An-Nur',          v:64,  j:18, mak:false},
  {n:25, ar:'الفرقان',    en:'Al-Furqan',       v:77,  j:18, mak:true},
  {n:26, ar:'الشعراء',    en:"Ash-Shu'ara",     v:227, j:19, mak:true},
  {n:27, ar:'النمل',      en:'An-Naml',         v:93,  j:19, mak:true},
  {n:28, ar:'القصص',      en:'Al-Qasas',        v:88,  j:20, mak:true},
  {n:29, ar:'العنكبوت',   en:'Al-Ankabut',      v:69,  j:20, mak:true},
  {n:30, ar:'الروم',      en:'Ar-Rum',          v:60,  j:21, mak:true},
  {n:31, ar:'لقمان',      en:'Luqman',          v:34,  j:21, mak:true},
  {n:32, ar:'السجدة',     en:'As-Sajda',        v:30,  j:21, mak:true},
  {n:33, ar:'الأحزاب',    en:'Al-Ahzab',        v:73,  j:21, mak:false},
  {n:34, ar:'سبأ',        en:"Saba'",           v:54,  j:22, mak:true},
  {n:35, ar:'فاطر',       en:'Fatir',           v:45,  j:22, mak:true},
  {n:36, ar:'يس',         en:'Ya-Sin',          v:83,  j:22, mak:true},
  {n:37, ar:'الصافات',    en:'As-Saffat',       v:182, j:23, mak:true},
  {n:38, ar:'ص',          en:'Sad',             v:88,  j:23, mak:true},
  {n:39, ar:'الزمر',      en:'Az-Zumar',        v:75,  j:23, mak:true},
  {n:40, ar:'غافر',       en:'Ghafir',          v:85,  j:24, mak:true},
  {n:41, ar:'فصلت',       en:'Fussilat',        v:54,  j:24, mak:true},
  {n:42, ar:'الشورى',     en:'Ash-Shura',       v:53,  j:25, mak:true},
  {n:43, ar:'الزخرف',     en:'Az-Zukhruf',      v:89,  j:25, mak:true},
  {n:44, ar:'الدخان',     en:'Ad-Dukhan',       v:59,  j:25, mak:true},
  {n:45, ar:'الجاثية',    en:'Al-Jathiya',      v:37,  j:25, mak:true},
  {n:46, ar:'الأحقاف',    en:'Al-Ahqaf',        v:35,  j:26, mak:true},
  {n:47, ar:'محمد',       en:'Muhammad',        v:38,  j:26, mak:false},
  {n:48, ar:'الفتح',      en:'Al-Fath',         v:29,  j:26, mak:false},
  {n:49, ar:'الحجرات',    en:'Al-Hujurat',      v:18,  j:26, mak:false},
  {n:50, ar:'ق',          en:'Qaf',             v:45,  j:26, mak:true},
  {n:51, ar:'الذاريات',   en:'Adh-Dhariyat',    v:60,  j:26, mak:true},
  {n:52, ar:'الطور',      en:'At-Tur',          v:49,  j:27, mak:true},
  {n:53, ar:'النجم',      en:'An-Najm',         v:62,  j:27, mak:true},
  {n:54, ar:'القمر',      en:'Al-Qamar',        v:55,  j:27, mak:true},
  {n:55, ar:'الرحمن',     en:'Ar-Rahman',       v:78,  j:27, mak:false},
  {n:56, ar:'الواقعة',    en:"Al-Waqi'a",       v:96,  j:27, mak:true},
  {n:57, ar:'الحديد',     en:'Al-Hadid',        v:29,  j:27, mak:false},
  {n:58, ar:'المجادلة',   en:'Al-Mujadila',     v:22,  j:28, mak:false},
  {n:59, ar:'الحشر',      en:'Al-Hashr',        v:24,  j:28, mak:false},
  {n:60, ar:'الممتحنة',   en:'Al-Mumtahana',    v:13,  j:28, mak:false},
  {n:61, ar:'الصف',       en:'As-Saf',          v:14,  j:28, mak:false},
  {n:62, ar:'الجمعة',     en:"Al-Jumu'a",       v:11,  j:28, mak:false},
  {n:63, ar:'المنافقون',  en:'Al-Munafiqun',    v:11,  j:28, mak:false},
  {n:64, ar:'التغابن',    en:'At-Taghabun',     v:18,  j:28, mak:false},
  {n:65, ar:'الطلاق',     en:'At-Talaq',        v:12,  j:28, mak:false},
  {n:66, ar:'التحريم',    en:'At-Tahrim',       v:12,  j:28, mak:false},
  {n:67, ar:'الملك',      en:'Al-Mulk',         v:30,  j:29, mak:true},
  {n:68, ar:'القلم',      en:'Al-Qalam',        v:52,  j:29, mak:true},
  {n:69, ar:'الحاقة',     en:'Al-Haqqa',        v:52,  j:29, mak:true},
  {n:70, ar:'المعارج',    en:"Al-Ma'arij",      v:44,  j:29, mak:true},
  {n:71, ar:'نوح',        en:'Nuh',             v:28,  j:29, mak:true},
  {n:72, ar:'الجن',       en:'Al-Jinn',         v:28,  j:29, mak:true},
  {n:73, ar:'المزمل',     en:'Al-Muzzammil',    v:20,  j:29, mak:true},
  {n:74, ar:'المدثر',     en:'Al-Muddaththir',  v:56,  j:29, mak:true},
  {n:75, ar:'القيامة',    en:'Al-Qiyama',       v:40,  j:29, mak:true},
  {n:76, ar:'الإنسان',    en:'Al-Insan',        v:31,  j:29, mak:false},
  {n:77, ar:'المرسلات',   en:'Al-Mursalat',     v:50,  j:29, mak:true},
  {n:78, ar:'النبأ',      en:"An-Naba'",        v:40,  j:30, mak:true},
  {n:79, ar:'النازعات',   en:"An-Nazi'at",      v:46,  j:30, mak:true},
  {n:80, ar:'عبس',        en:'Abasa',           v:42,  j:30, mak:true},
  {n:81, ar:'التكوير',    en:'At-Takwir',       v:29,  j:30, mak:true},
  {n:82, ar:'الانفطار',   en:'Al-Infitar',      v:19,  j:30, mak:true},
  {n:83, ar:'المطففين',   en:'Al-Mutaffifin',   v:36,  j:30, mak:true},
  {n:84, ar:'الانشقاق',   en:'Al-Inshiqaq',     v:25,  j:30, mak:true},
  {n:85, ar:'البروج',     en:'Al-Buruj',        v:22,  j:30, mak:true},
  {n:86, ar:'الطارق',     en:'At-Tariq',        v:17,  j:30, mak:true},
  {n:87, ar:'الأعلى',     en:"Al-A'la",         v:19,  j:30, mak:true},
  {n:88, ar:'الغاشية',    en:'Al-Ghashiya',     v:26,  j:30, mak:true},
  {n:89, ar:'الفجر',      en:'Al-Fajr',         v:30,  j:30, mak:true},
  {n:90, ar:'البلد',      en:'Al-Balad',        v:20,  j:30, mak:true},
  {n:91, ar:'الشمس',      en:'Ash-Shams',       v:15,  j:30, mak:true},
  {n:92, ar:'الليل',      en:'Al-Layl',         v:21,  j:30, mak:true},
  {n:93, ar:'الضحى',      en:'Ad-Duha',         v:11,  j:30, mak:true},
  {n:94, ar:'الشرح',      en:'Ash-Sharh',       v:8,   j:30, mak:true},
  {n:95, ar:'التين',      en:'At-Tin',          v:8,   j:30, mak:true},
  {n:96, ar:'العلق',      en:"Al-'Alaq",        v:19,  j:30, mak:true},
  {n:97, ar:'القدر',      en:'Al-Qadr',         v:5,   j:30, mak:true},
  {n:98, ar:'البينة',     en:'Al-Bayyina',      v:8,   j:30, mak:false},
  {n:99, ar:'الزلزلة',    en:'Az-Zalzala',      v:8,   j:30, mak:false},
  {n:100,ar:'العاديات',   en:'Al-Adiyat',       v:11,  j:30, mak:true},
  {n:101,ar:'القارعة',    en:"Al-Qari'a",       v:11,  j:30, mak:true},
  {n:102,ar:'التكاثر',    en:'At-Takathur',     v:8,   j:30, mak:true},
  {n:103,ar:'العصر',      en:'Al-Asr',          v:3,   j:30, mak:true},
  {n:104,ar:'الهمزة',     en:'Al-Humaza',       v:9,   j:30, mak:true},
  {n:105,ar:'الفيل',      en:'Al-Fil',          v:5,   j:30, mak:true},
  {n:106,ar:'قريش',       en:'Quraysh',         v:4,   j:30, mak:true},
  {n:107,ar:'الماعون',    en:"Al-Ma'un",        v:7,   j:30, mak:true},
  {n:108,ar:'الكوثر',     en:'Al-Kawthar',      v:3,   j:30, mak:true},
  {n:109,ar:'الكافرون',   en:'Al-Kafirun',      v:6,   j:30, mak:true},
  {n:110,ar:'النصر',      en:'An-Nasr',         v:3,   j:30, mak:false},
  {n:111,ar:'المسد',      en:'Al-Masad',        v:5,   j:30, mak:true},
  {n:112,ar:'الإخلاص',    en:'Al-Ikhlas',       v:4,   j:30, mak:true},
  {n:113,ar:'الفلق',      en:'Al-Falaq',        v:5,   j:30, mak:true},
  {n:114,ar:'الناس',      en:'An-Nas',          v:6,   j:30, mak:true},
];

// ── الأجزاء الثلاثون ────────────────────────────────────────────
const JUZ: JuzEntry[] = [
  {n:1,  from:'الفاتحة',       to:'البقرة ١٤١'},
  {n:2,  from:'البقرة ١٤٢',   to:'البقرة ٢٥٢'},
  {n:3,  from:'البقرة ٢٥٣',   to:'آل عمران ٩٢'},
  {n:4,  from:'آل عمران ٩٣',  to:'النساء ٢٣'},
  {n:5,  from:'النساء ٢٤',    to:'النساء ١٤٧'},
  {n:6,  from:'النساء ١٤٨',   to:'المائدة ٨١'},
  {n:7,  from:'المائدة ٨٢',   to:'الأنعام ١١٠'},
  {n:8,  from:'الأنعام ١١١',  to:'الأعراف ٨٧'},
  {n:9,  from:'الأعراف ٨٨',   to:'الأنفال ٤٠'},
  {n:10, from:'الأنفال ٤١',   to:'التوبة ٩٢'},
  {n:11, from:'التوبة ٩٣',    to:'هود ٥'},
  {n:12, from:'هود ٦',        to:'يوسف ٥٢'},
  {n:13, from:'يوسف ٥٣',     to:'إبراهيم ٥٢'},
  {n:14, from:'الحجر',        to:'النحل ١٢٨'},
  {n:15, from:'الإسراء',      to:'الكهف ٧٤'},
  {n:16, from:'الكهف ٧٥',    to:'طه ١٣٥'},
  {n:17, from:'الأنبياء',     to:'الحج ٧٨'},
  {n:18, from:'المؤمنون',     to:'الفرقان ٢٠'},
  {n:19, from:'الفرقان ٢١',   to:'النمل ٥٥'},
  {n:20, from:'النمل ٥٦',    to:'العنكبوت ٤٥'},
  {n:21, from:'العنكبوت ٤٦', to:'الأحزاب ٣٠'},
  {n:22, from:'الأحزاب ٣١',  to:'يس ٢٧'},
  {n:23, from:'يس ٢٨',       to:'الزمر ٣١'},
  {n:24, from:'الزمر ٣٢',    to:'فصلت ٤٦'},
  {n:25, from:'فصلت ٤٧',    to:'الجاثية ٣٧'},
  {n:26, from:'الأحقاف',     to:'الذاريات ٣٠'},
  {n:27, from:'الذاريات ٣١', to:'الحديد ٢٩'},
  {n:28, from:'المجادلة',    to:'التحريم'},
  {n:29, from:'الملك',       to:'المرسلات'},
  {n:30, from:'النبأ',       to:'الناس'},
];

// ── بيانات الأذكار ───────────────────────────────────────────────
const AZKAR: Record<AzkarCat, Zikr[]> = {
  morning: [
    {id:1,  goal:1,   text:'﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ...﴾', note:'آية الكرسي — من قرأها حين يصبح أُجير من الجن حتى يمسي'},
    {id:2,  goal:3,   text:'﴿قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ﴾', note:'سورة الإخلاص'},
    {id:3,  goal:3,   text:'﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ﴾', note:'سورة الفلق'},
    {id:4,  goal:3,   text:'﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ﴾', note:'سورة الناس'},
    {id:5,  goal:1,   text:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'},
    {id:6,  goal:1,   text:'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ'},
    {id:7,  goal:1,   text:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', note:'سيد الاستغفار — من قاله موقناً فمات من يومه دخل الجنة'},
    {id:8,  goal:3,   text:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', note:'من قالها ثلاثاً لم يضره شيء حتى يمسي'},
    {id:9,  goal:3,   text:'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا', note:'كان حقاً على الله أن يُرضيه'},
    {id:10, goal:100, text:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', note:'من قالها مئة مرة صباحاً حُطَّت خطاياه وإن كانت مثل زبد البحر'},
  ],
  evening: [
    {id:11, goal:1,   text:'﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...﴾', note:'آية الكرسي — حصن من الجن حتى الصباح'},
    {id:12, goal:3,   text:'﴿قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ﴾', note:'سورة الإخلاص'},
    {id:13, goal:3,   text:'﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ...﴾', note:'سورة الفلق'},
    {id:14, goal:3,   text:'﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ...﴾', note:'سورة الناس'},
    {id:15, goal:1,   text:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'},
    {id:16, goal:1,   text:'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ'},
    {id:17, goal:1,   text:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ...', note:'سيد الاستغفار'},
    {id:18, goal:3,   text:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', note:'من قالها ثلاثاً لم يضره شيء حتى يصبح'},
    {id:19, goal:3,   text:'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا'},
    {id:20, goal:100, text:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ'},
  ],
  after: [
    {id:21, goal:3,  text:'أَسْتَغْفِرُ اللَّهَ'},
    {id:22, goal:1,  text:'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ'},
    {id:23, goal:1,  text:'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَلَا نَعْبُدُ إِلَّا إِيَّاهُ'},
    {id:24, goal:33, text:'سُبْحَانَ اللَّهِ'},
    {id:25, goal:33, text:'الْحَمْدُ لِلَّهِ'},
    {id:26, goal:33, text:'اللَّهُ أَكْبَرُ'},
    {id:27, goal:1,  text:'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', note:'يُغفر له وإن كان مثل زبد البحر'},
    {id:28, goal:1,  text:'﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...﴾', note:'آية الكرسي — من قرأها دبر كل صلاة لم يمنعه من دخول الجنة إلا الموت'},
  ],
  general: [
    {id:29, goal:0, text:'سُبْحَانَ اللَّهِ',                                      note:'أحب الكلام إلى الله'},
    {id:30, goal:0, text:'الْحَمْدُ لِلَّهِ',                                      note:'تملأ الميزان'},
    {id:31, goal:0, text:'لَا إِلَٰهَ إِلَّا اللَّهُ',                             note:'أفضل الذكر'},
    {id:32, goal:0, text:'اللَّهُ أَكْبَرُ'},
    {id:33, goal:0, text:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ', note:'كلمتان خفيفتان على اللسان ثقيلتان في الميزان حبيبتان إلى الرحمن'},
    {id:34, goal:0, text:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',             note:'كنز من كنوز الجنة'},
    {id:35, goal:0, text:'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ', note:'أحب إلى النبي ﷺ مما طلعت عليه الشمس'},
    {id:36, goal:0, text:'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',  note:'من صلى عليه مرة صلى الله عليه عشراً'},
  ],
};

// ── أوقات الصلاة ──────────────────────────────────────────────
const PRAYERS = [
  {key:'Fajr',    ar:'الفجر',   icon:'🌅'},
  {key:'Sunrise', ar:'الشروق',  icon:'☀️', muted:true},
  {key:'Dhuhr',   ar:'الظهر',   icon:'🌤️'},
  {key:'Asr',     ar:'العصر',   icon:'🌇'},
  {key:'Maghrib', ar:'المغرب',  icon:'🌆'},
  {key:'Isha',    ar:'العشاء',  icon:'🌙'},
];

// ══════════════════════════════════════════════════════════════
//  المكوّن الرئيسي
// ══════════════════════════════════════════════════════════════
export function QuranClient({ locale }: { locale: string }) {

  // ── الحالة ─────────────────────────────────────────────────
  const [tab,          setTab]          = useState<Tab>('quran');
  // قرآن
  const [surah,        setSurah]        = useState<Surah | null>(null);
  const [ayahs,        setAyahs]        = useState<Ayah[]>([]);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [search,       setSearch]       = useState('');
  // صلاة
  const [timings,      setTimings]      = useState<Record<string,string> | null>(null);
  const [prayerCity,   setPrayerCity]   = useState('Amsterdam');
  const [prayerDate,   setPrayerDate]   = useState('');
  const [prayerErr,    setPrayerErr]    = useState(false);
  const [loadingPrayer,setLoadingPrayer]= useState(false);
  // أذكار
  const [azkarCat,     setAzkarCat]     = useState<AzkarCat>('morning');
  const [counts,       setCounts]       = useState<Record<number,number>>({});
  // ختمة
  const [khatma,       setKhatma]       = useState<Record<number,boolean>>({});
  const [khatmaStart,  setKhatmaStart]  = useState<string|null>(null);

  // تحميل الختمة من localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('y2_khatma');
      if (saved) setKhatma(JSON.parse(saved) as Record<number,boolean>);
      const start = localStorage.getItem('y2_khatma_start');
      if (start) setKhatmaStart(start);
    } catch { /* SSR */ }
  }, []);

  // جلب أوقات الصلاة
  const fetchPrayer = useCallback(async (city: string) => {
    setLoadingPrayer(true); setPrayerErr(false); setTimings(null);
    try {
      const res  = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Netherlands&method=3`);
      const data = await res.json() as { data: { timings: Record<string,string>; date: { readable: string } } };
      setTimings(data.data.timings);
      setPrayerDate(data.data.date.readable);
    } catch { setPrayerErr(true); }
    finally  { setLoadingPrayer(false); }
  }, []);

  // جلب أوقات الصلاة عند فتح التبويب
  useEffect(() => {
    if (tab === 'prayer' && !timings && !prayerErr) fetchPrayer(prayerCity);
  }, [tab, timings, prayerErr, fetchPrayer, prayerCity]);

  // قراءة سورة
  const readSurah = useCallback(async (s: Surah) => {
    setSurah(s); setAyahs([]); setLoadingAyahs(true);
    try {
      const res  = await fetch(`https://api.alquran.cloud/v1/surah/${s.n}`);
      const data = await res.json() as { data: { ayahs: { numberInSurah: number; text: string }[] } };
      setAyahs(data.data.ayahs.map(a => ({ n: a.numberInSurah, text: a.text })));
    } catch {
      setAyahs([{ n: 0, text: '⚠️ تعذّر تحميل السورة، تحقق من الإنترنت.' }]);
    }
    setLoadingAyahs(false);
  }, []);

  // تبديل حالة جزء في الختمة
  const toggleJuz = (n: number) => {
    setKhatma(prev => {
      const next = { ...prev, [n]: !prev[n] };
      try {
        localStorage.setItem('y2_khatma', JSON.stringify(next));
        if (!prev[n] && !khatmaStart) {
          const today = new Date().toLocaleDateString('ar-EG');
          setKhatmaStart(today);
          localStorage.setItem('y2_khatma_start', today);
        }
      } catch { /* SSR */ }
      return next;
    });
  };

  const resetKhatma = () => {
    setKhatma({}); setKhatmaStart(null);
    try { localStorage.removeItem('y2_khatma'); localStorage.removeItem('y2_khatma_start'); } catch { /* SSR */ }
  };

  const resetCounts = () => {
    const ids = AZKAR[azkarCat].map(z => z.id);
    setCounts(prev => { const n = {...prev}; ids.forEach(id => { n[id] = 0; }); return n; });
  };

  const filtered = S.filter(s =>
    s.ar.includes(search) || s.en.toLowerCase().includes(search.toLowerCase()) || String(s.n) === search
  );

  const doneJuz = Object.values(khatma).filter(Boolean).length;

  // ── العرض ──────────────────────────────────────────────────
  return (
    <AppShell locale={locale} title="القرآن والصلاة والأذكار">
      <div dir="rtl">

        {/* ▌شريط التبويبات ▌ */}
        <div className="flex gap-1 mb-5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {([
            {k:'quran'  as Tab, label:'📖 القرآن'},
            {k:'prayer' as Tab, label:'🕌 أوقات الصلاة'},
            {k:'azkar'  as Tab, label:'📿 الأذكار'},
            {k:'khatma' as Tab, label:'✅ الختمة'},
          ]).map(t => (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={`flex-1 py-2 px-2 rounded-lg text-sm font-bold transition-all ${
                tab === t.k ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════════ تبويب القرآن ══════════════ */}
        {tab === 'quran' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{height:'calc(100vh - 230px)'}}>

            {/* قائمة السور */}
            <div className="card flex flex-col overflow-hidden">
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <input className="input" placeholder="ابحث عن سورة..."
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="flex-1 overflow-y-auto">
                {filtered.map(s => (
                  <button key={s.n} onClick={() => readSurah(s)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-right border-b border-gray-50 dark:border-gray-800
                      hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                      ${surah?.n === s.n ? 'bg-primary/10 text-primary' : ''}`}>
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                      {s.n}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">{s.ar}</p>
                      <p className="text-xs text-gray-400">{s.en} · {s.v} آية · {s.mak ? 'مكية' : 'مدنية'}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">ج{s.j}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* قارئ الآيات */}
            <div className="lg:col-span-2 card flex flex-col overflow-hidden">
              {!surah ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2">
                  <p className="text-6xl">📖</p>
                  <p className="text-lg font-semibold">اختر سورة للقراءة</p>
                  <p className="text-sm">القرآن الكريم · ١١٤ سورة</p>
                </div>
              ) : (
                <>
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div>
                      <h2 className="font-black text-xl">{surah.ar}</h2>
                      <p className="text-xs text-gray-400">{surah.en} · {surah.v} آية · الجزء {surah.j}</p>
                    </div>
                    <span className={`badge ${surah.mak ? 'badge-green' : 'badge-blue'}`}>
                      {surah.mak ? 'مكية' : 'مدنية'}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-5">
                    {loadingAyahs ? (
                      <div className="flex items-center justify-center h-32 text-gray-400 gap-2">
                        <span className="animate-pulse text-3xl">📖</span>
                        <span>جارٍ تحميل السورة...</span>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {surah.n !== 9 && (
                          <p className="text-center text-2xl font-bold text-primary/80 py-4 border-b border-dashed border-primary/20">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                          </p>
                        )}
                        {ayahs.map(a => (
                          <div key={a.n} className="flex items-start gap-4 pb-4 border-b border-gray-50 dark:border-gray-800">
                            <span className="shrink-0 w-8 h-8 rounded-full border-2 border-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                              {a.n}
                            </span>
                            <p className="text-xl leading-loose flex-1">{a.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ══════════════ تبويب الصلاة ══════════════ */}
        {tab === 'prayer' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="card p-4 flex gap-2">
              <input className="input flex-1" value={prayerCity}
                onChange={e => setPrayerCity(e.target.value)}
                placeholder="المدينة..." />
              <button className="btn-primary px-4"
                onClick={() => { setTimings(null); setPrayerErr(false); fetchPrayer(prayerCity); }}>
                🔍
              </button>
            </div>

            {loadingPrayer && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-4xl animate-pulse mb-3">🕌</p>
                <p>جارٍ تحميل أوقات الصلاة...</p>
              </div>
            )}

            {prayerErr && (
              <div className="card p-6 text-center text-red-500">
                <p className="text-3xl mb-2">⚠️</p>
                <p>تعذّر الاتصال. تحقق من الإنترنت ثم أعد المحاولة.</p>
              </div>
            )}

            {timings && !prayerErr && (
              <div className="card overflow-hidden shadow-lg">
                <div className="bg-gradient-to-l from-primary to-orange-500 p-5 text-white text-center">
                  <p className="text-2xl font-black mb-1">{prayerCity} · هولندا 🇳🇱</p>
                  <p className="text-sm opacity-80">{prayerDate}</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {PRAYERS.map(p => timings[p.key] ? (
                    <div key={p.key}
                      className={`flex items-center justify-between px-6 py-4 ${(p as {muted?:boolean}).muted ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.icon}</span>
                        <p className="font-bold text-base">{p.ar}</p>
                      </div>
                      <p className="font-mono font-black text-xl text-primary">{timings[p.key]}</p>
                    </div>
                  ) : null)}
                </div>
              </div>
            )}
            <p className="text-xs text-center text-gray-400 pb-2">
              المصدر: Aladhan API · طريقة الحساب: رابطة العالم الإسلامي
            </p>
          </div>
        )}

        {/* ══════════════ تبويب الأذكار ══════════════ */}
        {tab === 'azkar' && (
          <div className="space-y-4 max-w-2xl mx-auto">
            {/* شريط الفئات */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              {([
                {k:'morning' as AzkarCat, label:'🌅 الصباح'},
                {k:'evening' as AzkarCat, label:'🌙 المساء'},
                {k:'after'   as AzkarCat, label:'🕌 بعد الصلاة'},
                {k:'general' as AzkarCat, label:'📿 عامة'},
              ]).map(c => (
                <button key={c.k} onClick={() => setAzkarCat(c.k)}
                  className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                    azkarCat === c.k ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}>
                  {c.label}
                </button>
              ))}
            </div>

            {/* شريط التقدم */}
            {azkarCat !== 'general' && (() => {
              const list = AZKAR[azkarCat];
              const done = list.filter(z => (counts[z.id] ?? 0) >= z.goal).length;
              return (
                <div className="card p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold mb-1.5">{done} / {list.length} ذكر مكتمل</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                        style={{width:`${(done/list.length)*100}%`}} />
                    </div>
                  </div>
                  <button className="btn-secondary text-xs py-1.5 shrink-0" onClick={resetCounts}>
                    إعادة تعيين
                  </button>
                </div>
              );
            })()}

            {/* بطاقات الأذكار */}
            <div className="space-y-3">
              {AZKAR[azkarCat].map(z => {
                const cur  = counts[z.id] ?? 0;
                const done = z.goal > 0 && cur >= z.goal;
                return (
                  <div key={z.id} className={`card p-5 transition-all ${done ? 'opacity-60 border-green-300 dark:border-green-700' : ''}`}>
                    <p className="text-lg leading-loose mb-3">{z.text}</p>
                    {z.note && <p className="text-xs text-primary mb-4">💡 {z.note}</p>}
                    <div className="flex items-center gap-3">
                      <button onClick={() => !done && setCounts(p => ({...p, [z.id]:(p[z.id]??0)+1}))}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shrink-0
                          active:scale-90 transition-all ${
                            done
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 cursor-default'
                              : 'bg-primary text-white hover:bg-red-700 cursor-pointer'
                          }`}>
                        {done ? '✓' : '+'}
                      </button>
                      <div className="flex-1">
                        {z.goal > 0 ? (
                          <>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="font-bold">{cur} / {z.goal} مرة</span>
                              {done && <span className="text-green-500 font-bold">✓ مكتمل</span>}
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className={`h-2 rounded-full transition-all duration-300 ${done ? 'bg-green-500' : 'bg-primary'}`}
                                style={{width:`${Math.min((cur/z.goal)*100,100)}%`}} />
                            </div>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">{cur} مرة · اضغط للعدّ</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════ تبويب الختمة ══════════════ */}
        {tab === 'khatma' && (
          <div className="space-y-5">
            {/* بطاقة التقدم الكلي */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-black text-xl">ختمة القرآن الكريم</h2>
                  {khatmaStart && <p className="text-xs text-gray-400 mt-0.5">تاريخ البدء: {khatmaStart}</p>}
                </div>
                <button className="btn-secondary text-sm py-1.5 px-4" onClick={resetKhatma}>
                  ختمة جديدة 🔄
                </button>
              </div>
              <div className="flex items-end gap-3 mb-3">
                <span className="font-black text-5xl text-primary">{doneJuz}</span>
                <span className="text-gray-400 pb-1">/ ٣٠ جزء</span>
                {doneJuz === 30 && (
                  <span className="badge badge-green text-sm mr-auto animate-bounce">
                    🎉 اكتملت الختمة! بارك الله لك
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-l from-primary to-orange-400 h-4 rounded-full transition-all duration-500"
                  style={{width:`${(doneJuz/30)*100}%`}} />
              </div>
              <p className="text-xs text-gray-400 mt-2">{Math.round((doneJuz/30)*100)}% مكتمل · الأجزاء المتبقية: {30-doneJuz}</p>
            </div>

            {/* شبكة الأجزاء */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {JUZ.map(j => {
                const done = !!khatma[j.n];
                return (
                  <button key={j.n} onClick={() => toggleJuz(j.n)}
                    className={`card p-3 text-right transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                      done ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600' : 'hover:border-primary/40'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                        done ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'
                      }`}>
                        {done ? '✓' : j.n}
                      </span>
                      <span className="text-xs text-gray-400">ج{j.n}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">{j.from}</p>
                    <p className="text-xs text-gray-400">↓ {j.to}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
