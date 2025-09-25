const tr = {
  header: {
    productName: "Spotify Ne Dinliyor?",
  },
  landing: {
    title: "MSN tarzı now‑playing profil & embed",
    subtitle: "Spotify hesabını bağla, README için canlı now‑playing rozeti oluştur.",
  },
  login: {
    placeholder: "kullanıcı adın (ör. husnu)",
    button: "Spotify ile giriş",
  },
  settings: {
    groups: {
      visual: "Görsel Ayarları",
      style: "Stil Ayarları",
    },
    labels: {
      cover: "Kapak görseli",
      link: "Open Spotify",
      time: "Süre bilgisi",
      progress: "Progress bar",
      theme: "Tema",
      layout: "Yerleşim",
      variant: "Varyant",
      dark: "Dark",
      light: "Light",
      horizontal: "Yatay",
      vertical: "Dikey",
      default: "Standart",
      compact: "Compact",
    },
    placeholder: {
      title: "Widget Ayarları",
      description: "Kullanıcı adınızı girip Spotify ile giriş yaptıktan sonra widget özelleştirme seçenekleri burada görünecek.",
      hint: "Kullanıcı adı girmeyi bekliyor..."
    }
  },
  preview: {
    overlayLogin: "Önizleme için Spotify ile giriş yap",
    empty: "Önizleme için Spotify ile giriş yap",
  },
  embed: {
    title: "Embed URL",
    copyUrl: "URL Kopyala",
    copyMd: "Markdown",
    copied: "Kopyalandı!",
  },
  info: {
    readmeBadge: {
      title: "README Badge",
      desc: "GitHub README’n için canlı SVG. Embed URL’ini kopyalayıp README.md içine ekle.",
    },
  },
  contact: {
    text: "İletişim:",
  },
  legal: {
    privacy: {
      title: "Gizlilik Politikası",
      updated: "Son güncelleme",
      sections: {
        introTitle: "Giriş",
        introBody: "Bu politika, now‑playing profil ve embed özelliğini kullanırken hangi verilerin işlendiğini açıklar.",
        dataTitle: "İşlenen Veriler",
        dataBody: "Spotify yenileme (refresh) token’ınızı, kısa ömürlü erişim token’ları almak için saklarız. Rozeti oluşturmak için o an çalınan veya yakın zamanda çalınan şarkı metadatalarını (şarkı adı, sanatçı, albüm, kapak görseli, Spotify linki) çağırabiliriz.",
        usageTitle: "Veri Kullanımı",
        usageBody: "Refresh token yalnızca Spotify API’lerini sizin adınıza çağırmak ve o an/son çalınan şarkıyı göstermek için kullanılır. Verilerinizi satmayız veya paylaşmayız.",
        cookiesTitle: "Çerezler",
        cookiesBody: "Kullanıcı adınızı ve dil tercihinizi hatırlamak için küçük bir çerez kullanırız (takip amaçlı değildir).",
        thirdTitle: "Üçüncü Taraf Servisler",
        thirdBody: "Spotify API’lerini kullanırız ve refresh token’ınızı güvenli saklamak için Vercel KV kullanılabilir.",
        retentionTitle: "Saklama Süresi",
        retentionBody: "Token’ınızı istediğiniz zaman revoke endpoint’i ile silebilirsiniz. Aksi halde erişimi siz iptal edene kadar saklarız.",
        rightsTitle: "Haklarınız",
        rightsBody: "Erişimi iptal edebilir, saklanan token’ınızın silinmesini talep edebilir ve hizmeti kullanmayı bırakabilirsiniz.",
        contactTitle: "İletişim",
        contactBody: "Sorular için LinkedIn üzerinden ulaşın: linkedin.com/in/husnu",
      },
    },
    terms: {
      title: "Kullanım Şartları",
      updated: "Son güncelleme",
      sections: {
        introTitle: "Giriş",
        introBody: "Bu Şartlar, now‑playing profil ve embed hizmetinin kullanımını düzenler. Lütfen dikkatle okuyunuz.",
        acceptTitle: "Şartların Kabulü",
        acceptBody: "Hizmeti kullanarak bu Şartları kabul etmiş olursunuz.",
        useTitle: "Hizmetin Kullanımı",
        useBody: "Now‑playing rozetini embed edebilir ve kamuya açık profil linkinizi izin verilen alanlarda kullanabilirsiniz. API’leri kötüye kullanmayın ve başkalarının haklarını ihlal etmeyin.",
        contentTitle: "İçerikleriniz",
        contentBody: "Spotify hesabınız ve embed’ler aracılığıyla gösterilen içerikten siz sorumlusunuz.",
        prohibitedTitle: "Yasaklı Faaliyetler",
        prohibitedBody: "Scraping, spam, tersine mühendislik veya hukuka aykırı kullanım yasaktır.",
        disclaimerTitle: "Feragatnameler",
        disclaimerBody: "Hizmet herhangi bir garanti olmaksızın ‘olduğu gibi’ sunulur. Spotify ayrı bir platformdur ve ilişkili değildir.",
        liabilityTitle: "Sorumluluk Sınırı",
        liabilityBody: "Yürürlükteki hukukun izin verdiği ölçüde, dolaylı, arızi veya sonuçsal zararlardan sorumlu değiliz.",
        changesTitle: "Değişiklikler",
        changesBody: "Bu Şartlar zaman zaman güncellenebilir. Hizmeti kullanmaya devam etmeniz güncel Şartları kabul ettiğiniz anlamına gelir.",
        lawTitle: "Uygulanacak Hukuk",
        lawBody: "Aksi gerekmedikçe, bu Şartlar yargı alanınızdaki ilgili hukuk kurallarına tabidir.",
        contactTitle: "İletişim",
        contactBody: "Sorular için LinkedIn üzerinden ulaşın: linkedin.com/in/husnu",
      },
    },
  },
} as const;

export default tr;
