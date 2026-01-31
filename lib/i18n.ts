export type Language = 'de' | 'en' | 'uk';

export const languageOptions: { code: Language; short: string; label: string }[] = [
  { code: 'de', short: 'DE', label: 'Deutsch' },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'uk', short: 'UK', label: 'Українська' }
];

type TranslationTree = typeof translations['de'];

export const translations = {
  de: {
    nav: {
      home: 'Start',
      about: 'Über mich',
      services: 'Leistungen',
      book: 'Termin buchen',
      login: 'Login',
      cta: 'Termin buchen'
    },
    home: {
      eyebrow: 'Online. Vertrauensvoll. Diskret.',
      title: 'Psychologische Beratung mit Ruhe und Klarheit – überall erreichbar.',
      subtitle:
        'Ich bin Anna Kosar, Psychologin. In vertraulichen Online-Sitzungen per Zoom oder Microsoft Teams unterstütze ich Sie dabei, Orientierung zu finden, Entscheidungen zu treffen und Belastungen zu reduzieren.',
      ctas: { book: 'Termin buchen', services: 'Leistungen ansehen' },
      bullets: [
        'Kostenloses 15-Minuten Kennenlerngespräch',
        'DSGVO-konform & vertraulich',
        'Termine flexibel online'
      ],
      profile: {
        eyebrow: 'Profil',
        title: 'Anna Kosar, Psychologin',
        text:
          'Studium der Psychologie, spezialisiert auf belastende Lebenssituationen, Entscheidungsfindung und Stressbewältigung. Ich arbeite strukturiert, empathisch und ergebnisorientiert.',
        bullets: [
          'Online-Sitzungen per Zoom oder Microsoft Teams',
          'Vertraulichkeit und klare nächste Schritte in jeder Sitzung',
          'Terminbestätigung sofort nach Buchung'
        ],
        freeIntroTitle: 'Kostenloses Kennenlerngespräch',
        freeIntroText: '15 Minuten, einmalig pro Person, um Ihr Anliegen einzuordnen.'
      },
      pillars: [
        {
          title: 'Vertrauensvoll & diskret',
          text: 'Sichere Videositzungen, verschlüsselte Daten und streng vertrauliche Zusammenarbeit.'
        },
        {
          title: 'Strukturiert & klar',
          text: 'Jede Sitzung endet mit konkreten nächsten Schritten, damit Sie spürbar vorankommen.'
        },
        {
          title: 'Flexibel online',
          text: 'Termine bequem von überall – mit sofortiger Bestätigung und Meeting-Link.'
        }
      ],
      steps: {
        eyebrow: 'Ablauf',
        title: 'So läuft die Beratung ab',
        items: [
          '1. Kennenlernen: 15 Minuten kostenlos, um Ihr Anliegen einzuordnen.',
          '2. Termin wählen: Passende Zeit auswählen, Bestätigung folgt automatisch.',
          '3. Sitzung online: Zoom oder Microsoft Teams – vertraulich und strukturiert.',
          '4. Nachverfolgung: Auf Wunsch kurze Zusammenfassung und nächste Schritte.'
        ]
      },
      actionCard: {
        eyebrow: 'Direkt starten',
        title: 'Buchen Sie Ihren Termin',
        text: 'Wählen Sie ein kostenloses Kennenlerngespräch oder eine reguläre Sitzung. Termine überschneiden sich nicht – freie Slots sind sofort sichtbar.',
        ctas: { book: 'Termin buchen', login: 'Kunden-Login' }
      }
    },
    about: {
      eyebrow: 'Über mich',
      title: 'Professionell, empathisch, diskret.',
      intro:
        'Mein Name ist Anna Kosar. Als Psychologin begleite ich Menschen in herausfordernden Lebenssituationen. Ich arbeite ruhig, strukturiert und lösungsorientiert – immer mit Respekt vor Ihrer Situation und ohne Heilversprechen.',
      cards: {
        workingStyle: {
          title: 'Arbeitsweise',
          bullets: [
            'Klare Zielsetzung und gemeinsame Prioritäten pro Sitzung.',
            'Strukturierte Online-Gespräche mit spürbaren Ergebnissen.',
            'Vertraulichkeit und Datenschutz als Grundprinzip.'
          ]
        },
        attitude: {
          title: 'Haltung',
          bullets: [
            'Empathisch, wertschätzend, transparent.',
            'Keine Heilversprechen, sondern realistische Perspektiven.',
            'Evidenzbasierte Methoden, angepasst an Ihr Anliegen.'
          ]
        }
      },
      focusTitle: 'Schwerpunkte',
      focusText:
        'Belastungen im Beruf, Entscheidungsfindung, Stress- und Krisenbewältigung, Umgang mit Veränderungen sowie Stärkung von Resilienz und Klarheit im Alltag.'
    },
    services: {
      eyebrow: 'Leistungen',
      title: 'Online-Begleitung mit klarer Struktur.',
      intro:
        'Wählen Sie zwischen einem kostenlosen Kennenlerngespräch oder einer regulären Sitzung. Termine werden sofort bestätigt und enthalten den Meeting-Link.',
      items: [
        {
          title: 'Online Psychologische Beratung',
          desc: 'Strukturierte Sitzungen mit klaren nächsten Schritten, diskret und ortsunabhängig.',
          detail: '50 Minuten, via Zoom oder Microsoft Teams.'
        },
        {
          title: 'Einzelgespräche',
          desc: 'Individuelle Begleitung bei beruflichen oder privaten Belastungen.',
          detail: 'Fokus auf Klarheit, Stabilisierung und Entscheidungshilfe.'
        },
        {
          title: 'Kostenloses 15-Minuten Einordnungsgespräch',
          desc: 'Einmalig pro Person, um Ihr Anliegen zu verstehen und das Vorgehen abzustimmen.',
          detail: 'Sie wählen einfach einen freien Slot im Kalender.'
        },
        {
          title: 'Ablauf der Zusammenarbeit',
          desc: 'Zielklärung, strukturierte Sitzungen, Nachverfolgung und optional kurze Zusammenfassung.',
          detail: 'Transparente Kommunikation und klare Terminbestätigung.'
        }
      ]
    },
    book: {
      eyebrow: 'Termin buchen',
      title: 'Wählen Sie Ihren Termin online.',
      intro:
        'Sofortige Bestätigung, kein Überschneiden von Terminen. Das kostenlose 15-Minuten Kennenlerngespräch ist einmalig pro Person buchbar.',
      envWarning:
        'Supabase-Umgebungsvariablen sind noch nicht gesetzt. Das UI wird angezeigt, Buchungen sind aber erst nach Hinterlegen von NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY möglich.'
    },
    bookingForm: {
      loginNotice: 'Bitte loggen Sie sich ein, bevor Sie einen Termin buchen.',
      labels: {
        appointmentType: 'Terminart',
        video: 'Videokonferenz',
        date: 'Datum',
        availableTimes: 'Verfügbare Zeiten',
        name: 'Name',
        email: 'E-Mail'
      },
      appointmentOptions: {
        freeIntro: 'Kostenloses 15-Minuten Gespräch (einmalig)',
        session: 'Reguläre Sitzung (50 Minuten)'
      },
      channels: { zoom: 'Zoom', teams: 'Microsoft Teams' },
      loading: 'Lade...',
      noSlots: 'Keine Zeiten verfügbar.',
      timeSuffix: 'Uhr',
      actions: {
        confirm: 'Termin bestätigen',
        booking: 'Wird gebucht…'
      },
      inlineNote: 'Sie erhalten sofort eine Bestätigung und den Link zur Sitzung.',
      errors: {
        login: 'Bitte loggen Sie sich ein, um einen Termin zu buchen.',
        selectTime: 'Bitte wählen Sie eine Uhrzeit.',
        bookingFailed: 'Buchung fehlgeschlagen',
        loadSlots: 'Slots konnten nicht geladen werden'
      },
      success: 'Termin bestätigt. Eine Bestätigung wird per E-Mail versendet.'
    },
    login: {
      eyebrow: 'Kunden-Login',
      title: 'Sicherer Zugang zu Ihren Terminen.',
      intro:
        'Melden Sie sich mit Ihrer E-Mail an. Sie erhalten einen einmaligen Login-Link. Nach dem Login sehen Sie Ihre gebuchten Termine und können neue Termine auswählen.',
      cta: 'Noch kein Konto? Termin buchen',
      cardTitle: 'E-Mail Login',
      cardSubtitle: 'Wir senden Ihnen einen sicheren Login-Link.',
      emailLabel: 'E-Mail',
      emailPlaceholder: 'name@email.com',
      send: 'Login-Link senden',
      sending: 'Sende Link…',
      sentMessage: 'E-Mail mit Login-Link gesendet. Bitte prüfen Sie Ihr Postfach.'
    },
    dashboard: {
      eyebrow: 'Ihre Termine',
      title: 'Übersicht der gebuchten Sitzungen',
      subtitle: 'Kommende Termine und Meeting-Links im Überblick.',
      envMissing:
        'Supabase-Umgebungsvariablen sind noch nicht gesetzt. Bitte in .env.local hinterlegen, um den geschützten Bereich zu nutzen.',
      appointmentLabels: {
        intro: 'Kennenlerngespräch',
        session: 'Sitzung'
      },
      status: 'Status',
      meetingLink: 'Meeting-Link',
      openMeeting: 'Sitzung öffnen',
      pendingLink: 'Wird bereitgestellt.',
      none: 'Keine Termine vorhanden.'
    },
    legal: {
      privacy: {
        title: 'Datenschutz',
        paragraphs: [
          'Alle Sitzungen sind vertraulich. Personenbezogene Daten werden ausschließlich zur Terminverwaltung und Kommunikation genutzt. Die Speicherung erfolgt in Supabase (EU-Rechenzentrum). Meeting-Links werden nur für Ihre gebuchten Termine bereitgestellt.',
          'Sie können jederzeit Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen. Kontakt: datenschutz@annakosar.com'
        ]
      },
      imprint: {
        title: 'Impressum',
        intro: 'Verantwortlich für den Inhalt dieser Website:',
        role: 'Psychologische Beratung',
        hosting: 'Diese Seite wird auf Vercel gehostet. Datenhaltung und Authentifizierung erfolgen über Supabase.'
      }
    },
    footer: {
      tagline: 'Psychologische Beratung – online & diskret',
      privacy: 'Datenschutz',
      imprint: 'Impressum',
      copyrightPrefix: '©'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      book: 'Book',
      login: 'Login',
      cta: 'Book now'
    },
    home: {
      eyebrow: 'Online. Trustworthy. Confidential.',
      title: 'Psychological counseling with calm and clarity – accessible everywhere.',
      subtitle:
        'I am Anna Kosar, a psychologist. In confidential online sessions via Zoom or Microsoft Teams I help you gain orientation, make decisions, and reduce stress.',
      ctas: { book: 'Book appointment', services: 'View services' },
      bullets: ['Free 15-minute intro call', 'GDPR-compliant & confidential', 'Flexible online appointments'],
      profile: {
        eyebrow: 'Profile',
        title: 'Anna Kosar, Psychologist',
        text:
          'Psychology degree focused on challenging life situations, decision-making, and stress management. I work structured, empathetic, and result-oriented.',
        bullets: [
          'Online sessions via Zoom or Microsoft Teams',
          'Confidentiality and clear next steps in every session',
          'Appointment confirmation immediately after booking'
        ],
        freeIntroTitle: 'Free introductory meeting',
        freeIntroText: '15 minutes, once per person, to understand your concern.'
      },
      pillars: [
        {
          title: 'Trustworthy & discreet',
          text: 'Secure video sessions, encrypted data, and strictly confidential collaboration.'
        },
        {
          title: 'Structured & clear',
          text: 'Each session ends with concrete next steps so you can feel real progress.'
        },
        {
          title: 'Flexible online',
          text: 'Book from anywhere – with instant confirmation and meeting link.'
        }
      ],
      steps: {
        eyebrow: 'Process',
        title: 'How the counseling works',
        items: [
          '1. Intro call: 15 minutes free to understand your situation.',
          '2. Pick a time: Choose a suitable slot, confirmation follows automatically.',
          '3. Online session: Zoom or Microsoft Teams – confidential and structured.',
          '4. Follow-up: Optional short summary and next steps.'
        ]
      },
      actionCard: {
        eyebrow: 'Get started',
        title: 'Book your appointment',
        text:
          'Choose a free intro call or a regular session. Slots never overlap – available times are shown instantly.',
        ctas: { book: 'Book appointment', login: 'Client login' }
      }
    },
    about: {
      eyebrow: 'About me',
      title: 'Professional, empathetic, discreet.',
      intro:
        'My name is Anna Kosar. As a psychologist I support people in challenging life situations. I work calmly, structured, and solution-focused – always with respect for your situation and without promising cures.',
      cards: {
        workingStyle: {
          title: 'Working style',
          bullets: [
            'Clear goals and shared priorities each session.',
            'Structured online conversations with tangible outcomes.',
            'Confidentiality and data protection as core principles.'
          ]
        },
        attitude: {
          title: 'Approach',
          bullets: [
            'Empathetic, respectful, transparent.',
            'No promises of healing, but realistic perspectives.',
            'Evidence-based methods tailored to your needs.'
          ]
        }
      },
      focusTitle: 'Focus areas',
      focusText:
        'Work-related strain, decision-making, stress and crisis management, dealing with change, and strengthening resilience and clarity in everyday life.'
    },
    services: {
      eyebrow: 'Services',
      title: 'Online support with clear structure.',
      intro:
        'Choose between a free introductory call or a regular session. Appointments are confirmed instantly and include the meeting link.',
      items: [
        {
          title: 'Online psychological counseling',
          desc: 'Structured sessions with clear next steps, discreet and location-independent.',
          detail: '50 minutes via Zoom or Microsoft Teams.'
        },
        {
          title: 'Individual sessions',
          desc: 'Personal support for professional or private challenges.',
          detail: 'Focus on clarity, stabilization, and decision support.'
        },
        {
          title: 'Free 15-minute intro call',
          desc: 'Once per person to understand your concern and align the approach.',
          detail: 'Simply choose a free slot in the calendar.'
        },
        {
          title: 'Collaboration process',
          desc: 'Goal setting, structured sessions, follow-up, and optional short summary.',
          detail: 'Transparent communication and clear appointment confirmation.'
        }
      ]
    },
    book: {
      eyebrow: 'Book appointment',
      title: 'Choose your appointment online.',
      intro:
        'Immediate confirmation, no overlapping slots. The free 15-minute intro call can be booked once per person.',
      envWarning:
        'Supabase environment variables are not set yet. The UI is shown, but bookings work only after adding NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    },
    bookingForm: {
      loginNotice: 'Please log in before booking an appointment.',
      labels: {
        appointmentType: 'Appointment type',
        video: 'Video conference',
        date: 'Date',
        availableTimes: 'Available times',
        name: 'Name',
        email: 'Email'
      },
      appointmentOptions: {
        freeIntro: 'Free 15-minute call (once)',
        session: 'Regular session (50 minutes)'
      },
      channels: { zoom: 'Zoom', teams: 'Microsoft Teams' },
      loading: 'Loading...',
      noSlots: 'No times available.',
      timeSuffix: '',
      actions: {
        confirm: 'Confirm appointment',
        booking: 'Booking…'
      },
      inlineNote: 'You will receive confirmation and the meeting link right away.',
      errors: {
        login: 'Please log in to book an appointment.',
        selectTime: 'Please choose a time.',
        bookingFailed: 'Booking failed',
        loadSlots: 'Could not load slots'
      },
      success: 'Appointment confirmed. A confirmation email will be sent.'
    },
    login: {
      eyebrow: 'Client login',
      title: 'Secure access to your appointments.',
      intro:
        'Log in with your email. You will receive a one-time login link. After login you can see your booked appointments and choose new ones.',
      cta: 'No account yet? Book an appointment',
      cardTitle: 'Email login',
      cardSubtitle: 'We will send you a secure login link.',
      emailLabel: 'Email',
      emailPlaceholder: 'name@email.com',
      send: 'Send login link',
      sending: 'Sending link…',
      sentMessage: 'Email with login link sent. Please check your inbox.'
    },
    dashboard: {
      eyebrow: 'Your appointments',
      title: 'Overview of booked sessions',
      subtitle: 'Upcoming appointments and meeting links at a glance.',
      envMissing:
        'Supabase environment variables are not set yet. Please add them to .env.local to use the protected area.',
      appointmentLabels: {
        intro: 'Intro call',
        session: 'Session'
      },
      status: 'Status',
      meetingLink: 'Meeting link',
      openMeeting: 'Open session',
      pendingLink: 'Will be provided.',
      none: 'No appointments yet.'
    },
    legal: {
      privacy: {
        title: 'Privacy',
        paragraphs: [
          'All sessions are confidential. Personal data is used solely for scheduling and communication. Storage takes place in Supabase (EU data center). Meeting links are provided only for your booked appointments.',
          'You can request information, correction, or deletion of your data at any time. Contact: datenschutz@annakosar.com'
        ]
      },
      imprint: {
        title: 'Imprint',
        intro: 'Responsible for this website:',
        role: 'Psychological counseling',
        hosting: 'This site is hosted on Vercel. Data storage and authentication are provided by Supabase.'
      }
    },
    footer: {
      tagline: 'Psychological counseling – online & discreet',
      privacy: 'Privacy',
      imprint: 'Imprint',
      copyrightPrefix: '©'
    }
  },
  uk: {
    nav: {
      home: 'Головна',
      about: 'Про мене',
      services: 'Послуги',
      book: 'Запис',
      login: 'Вхід',
      cta: 'Записатися'
    },
    home: {
      eyebrow: 'Онлайн. Надійно. Конфіденційно.',
      title: 'Психологічна консультація зі спокоєм і ясністю – доступна з будь-де.',
      subtitle:
        'Я Анна Косар, психолог. У конфіденційних онлайн-сесіях через Zoom або Microsoft Teams я допомагаю знайти орієнтири, приймати рішення та зменшувати стрес.',
      ctas: { book: 'Записатися', services: 'Переглянути послуги' },
      bullets: ['Безкоштовна 15-хвилинна зустріч', 'Відповідність GDPR та конфіденційність', 'Гнучкі онлайн-зустрічі'],
      profile: {
        eyebrow: 'Профіль',
        title: 'Анна Косар, психолог',
        text:
          'Диплом психолога, спеціалізація на складних життєвих ситуаціях, прийнятті рішень та управлінні стресом. Працюю структуровано, емпатійно та результативно.',
        bullets: [
          'Онлайн-сесії через Zoom або Microsoft Teams',
          'Конфіденційність та чіткі наступні кроки у кожній сесії',
          'Підтвердження запису одразу після бронювання'
        ],
        freeIntroTitle: 'Безкоштовна ознайомча зустріч',
        freeIntroText: '15 хвилин, один раз на людину, щоб зрозуміти ваш запит.'
      },
      pillars: [
        {
          title: 'Надійно та конфіденційно',
          text: 'Захищені відеосесії, шифровані дані та сувора конфіденційність.'
        },
        {
          title: 'Структуровано та ясно',
          text: 'Кожна сесія завершується конкретними наступними кроками, щоб ви відчували прогрес.'
        },
        {
          title: 'Гнучко онлайн',
          text: 'Запис з будь-якого місця – з миттєвим підтвердженням та посиланням на зустріч.'
        }
      ],
      steps: {
        eyebrow: 'Процес',
        title: 'Як проходить консультація',
        items: [
          '1. Знайомство: 15 хвилин безкоштовно, щоб зрозуміти ваш запит.',
          '2. Вибір часу: Оберіть зручний слот, підтвердження надходить автоматично.',
          '3. Онлайн-сесія: Zoom або Microsoft Teams – конфіденційно та структуровано.',
          '4. Подальші кроки: За бажанням короткий підсумок і наступні дії.'
        ]
      },
      actionCard: {
        eyebrow: 'Почати зараз',
        title: 'Запишіться на зустріч',
        text:
          'Оберіть безкоштовну ознайомчу зустріч або звичайну сесію. Слоти не перетинаються – доступні часи видно одразу.',
        ctas: { book: 'Записатися', login: 'Вхід для клієнтів' }
      }
    },
    about: {
      eyebrow: 'Про мене',
      title: 'Професійно, емпатійно, конфіденційно.',
      intro:
        'Мене звати Анна Косар. Як психолог я супроводжую людей у складних життєвих ситуаціях. Працюю спокійно, структуровано та орієнтовано на рішення – з повагою до вашої ситуації й без обіцянок зцілення.',
      cards: {
        workingStyle: {
          title: 'Стиль роботи',
          bullets: [
            'Чіткі цілі та спільні пріоритети на кожну сесію.',
            'Структуровані онлайн-розмови з відчутним результатом.',
            'Конфіденційність і захист даних як базовий принцип.'
          ]
        },
        attitude: {
          title: 'Підхід',
          bullets: [
            'Емпатійно, з повагою, прозоро.',
            'Без обіцянок зцілення, але з реалістичними перспективами.',
            'Методи з доказовою базою, адаптовані до вашого запиту.'
          ]
        }
      },
      focusTitle: 'Основні напрямки',
      focusText:
        'Професійні навантаження, прийняття рішень, подолання стресу та криз, адаптація до змін, зміцнення резилієнтності й ясності у повсякденні.'
    },
    services: {
      eyebrow: 'Послуги',
      title: 'Онлайн-підтримка з чіткою структурою.',
      intro:
        'Оберіть безкоштовну ознайомчу зустріч або звичайну сесію. Запис підтверджується миттєво та містить посилання на зустріч.',
      items: [
        {
          title: 'Онлайн психологічна консультація',
          desc: 'Структуровані сесії з чіткими наступними кроками, конфіденційно та незалежно від місця.',
          detail: '50 хвилин через Zoom або Microsoft Teams.'
        },
        {
          title: 'Індивідуальні сесії',
          desc: 'Персональний супровід при професійних чи приватних труднощах.',
          detail: 'Фокус на ясності, стабілізації та підтримці рішень.'
        },
        {
          title: 'Безкоштовна 15-хвилинна зустріч',
          desc: 'Одноразово на людину, щоб зрозуміти запит і узгодити підхід.',
          detail: 'Просто оберіть вільний слот у календарі.'
        },
        {
          title: 'Процес співпраці',
          desc: 'Визначення цілей, структуровані сесії, подальший супровід та за бажанням короткий підсумок.',
          detail: 'Прозора комунікація та чітке підтвердження запису.'
        }
      ]
    },
    book: {
      eyebrow: 'Запис',
      title: 'Оберіть час онлайн.',
      intro:
        'Миттєве підтвердження, без накладання слотів. Безкоштовну 15-хвилинну зустріч можна забронювати один раз на людину.',
      envWarning:
        'Змінні середовища Supabase ще не задані. Інтерфейс відображається, але бронювання можливе лише після додавання NEXT_PUBLIC_SUPABASE_URL та NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    },
    bookingForm: {
      loginNotice: 'Будь ласка, увійдіть, перш ніж бронювати зустріч.',
      labels: {
        appointmentType: 'Тип зустрічі',
        video: 'Відеоконференція',
        date: 'Дата',
        availableTimes: 'Доступний час',
        name: "Ім'я", 
        email: 'Ел. пошта'
      },
      appointmentOptions: {
        freeIntro: 'Безкоштовна 15-хвилинна зустріч (один раз)',
        session: 'Звичайна сесія (50 хвилин)'
      },
      channels: { zoom: 'Zoom', teams: 'Microsoft Teams' },
      loading: 'Завантаження...',
      noSlots: 'Немає доступного часу.',
      timeSuffix: '',
      actions: {
        confirm: 'Підтвердити запис',
        booking: 'Бронювання…'
      },
      inlineNote: 'Ви одразу отримаєте підтвердження та посилання на зустріч.',
      errors: {
        login: 'Увійдіть, щоб забронювати зустріч.',
        selectTime: 'Будь ласка, оберіть час.',
        bookingFailed: 'Не вдалося забронювати',
        loadSlots: 'Не вдалося завантажити слоти'
      },
      success: 'Запис підтверджено. Підтвердження буде надіслано електронною поштою.'
    },
    login: {
      eyebrow: 'Вхід для клієнтів',
      title: 'Безпечний доступ до ваших зустрічей.',
      intro:
        'Увійдіть за допомогою електронної пошти. Ви отримаєте одноразове посилання для входу. Після входу ви побачите свої записи та зможете бронювати нові.',
      cta: 'Ще немає облікового запису? Запишіться',
      cardTitle: 'Вхід за email',
      cardSubtitle: 'Ми надішлемо безпечне посилання для входу.',
      emailLabel: 'Ел. пошта',
      emailPlaceholder: 'name@email.com',
      send: 'Надіслати посилання',
      sending: 'Надсилання…',
      sentMessage: 'Лист з посиланням надіслано. Перевірте пошту.'
    },
    dashboard: {
      eyebrow: 'Ваші зустрічі',
      title: 'Огляд заброньованих сесій',
      subtitle: 'Найближчі зустрічі та посилання на них в одному місці.',
      envMissing:
        'Змінні середовища Supabase ще не задані. Додайте їх у .env.local, щоб користуватися захищеним розділом.',
      appointmentLabels: {
        intro: 'Ознайомча зустріч',
        session: 'Сесія'
      },
      status: 'Статус',
      meetingLink: 'Посилання на зустріч',
      openMeeting: 'Відкрити сесію',
      pendingLink: 'Скоро буде додано.',
      none: 'Записів поки немає.'
    },
    legal: {
      privacy: {
        title: 'Конфіденційність',
        paragraphs: [
          'Усі сесії конфіденційні. Персональні дані використовуються лише для управління записами та комунікації. Зберігання відбувається у Supabase (дата-центр в ЄС). Посилання на зустрічі надаються лише для ваших бронювань.',
          'Ви можете будь-коли запросити інформацію, виправлення або видалення своїх даних. Контакт: datenschutz@annakosar.com'
        ]
      },
      imprint: {
        title: 'Імпресум',
        intro: 'Відповідальна за цей сайт:',
        role: 'Психологічна консультація',
        hosting: 'Сайт розміщено на Vercel. Зберігання даних та автентифікацію забезпечує Supabase.'
      }
    },
    footer: {
      tagline: 'Психологічна консультація – онлайн і конфіденційно',
      privacy: 'Конфіденційність',
      imprint: 'Імпресум',
      copyrightPrefix: '©'
    }
  }
} satisfies Record<Language, Record<string, any>>;

const getByPath = (obj: any, path: string) => path.split('.').reduce((acc, key) => acc?.[key], obj);

export const getTranslation = <T = string>(lang: Language, path: string): T => {
  const value = getByPath(translations[lang], path) as T | undefined;
  if (value !== undefined) return value;
  const fallback = getByPath(translations.de, path) as T | undefined;
  return (fallback ?? (path as unknown as T));
};

export type TranslationPath = keyof TranslationTree extends string ? keyof TranslationTree : string;

export const normalizeLanguage = (value?: string | null): Language => {
  if (value === 'en' || value === 'uk' || value === 'de') return value;
  return 'de';
};
