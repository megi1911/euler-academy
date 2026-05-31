/* ============================================
   EULER ACADEMY — i18n Translations
   ============================================ */

const LANG = {
  current: localStorage.getItem('euler_lang') || 'en',

  set(lang) {
    this.current = lang;
    localStorage.setItem('euler_lang', lang);
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = lang === 'ka' ? (el.dataset.ka || el.dataset.en) : el.dataset.en;
    });
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
      el.placeholder = lang === 'ka' ? (el.dataset.placeholderKa || el.dataset.placeholderEn) : el.dataset.placeholderEn;
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  },

  t(key) {
    const T = {
      en: {
        home:'Home', teachers:'Teachers', enroll:'Enroll', login:'Login', logout:'Logout',
        dashboard:'Dashboard', admin:'Admin', mySchedule:'My Schedule', students:'Students',
        save:'Save', cancel:'Cancel', delete:'Delete', edit:'Edit', add:'Add', search:'Search',
        back:'Back', submit:'Submit', loading:'Loading...', confirm:'Confirm', close:'Close',
        yes:'Yes, delete', actions:'Actions', name:'Name', email:'Email', phone:'Phone',
        subject:'Subject', password:'Password', photo:'Photo', bio:'Bio', day:'Day',
        time:'Time', status:'Status', date:'Date', link:'Link', noData:'No data yet.',
        heroTitle:'Learn Without Limits at', heroTitleAccent:'Euler Academy',
        heroSub:'Connect with expert teachers, book your sessions, and start your learning journey today.',
        viewTeachers:'View Teachers', enrollNow:'Enroll Now',
        ourTeachers:'Our Teachers', chooseTeacher:'Choose a teacher and book your slot',
        aboutUs:'About Us',
        enrollTitle:'Enroll a Student', parentName:'Parent / Guardian Name',
        studentName:'Student Name', studentAge:'Student Age',
        chooseSubject:'Choose Subject', chooseTeacher2:'Choose Teacher',
        chooseSlot:'Choose Time Slot', notes:'Notes (optional)',
        enrollSuccess:'Enrollment submitted! The admin will confirm shortly.',
        loginTitle:'Sign In', loginAs:'Login as', adminLogin:'Admin', teacherLogin:'Teacher',
        username:'Username / Email',
        adminDashboard:'Admin Dashboard', manageSubjects:'Subjects',
        manageTeachers:'Teachers', manageStudents:'Students',
        manageEnrollments:'Enrollments', siteSettings:'Site Settings',
        addSubject:'Add Subject', addTeacher:'Add Teacher',
        subjectName:'Subject Name', totalStudents:'Total Students',
        totalTeachers:'Total Teachers', totalSubjects:'Total Subjects',
        pendingEnrollments:'Pending Enrollments',
        approve:'Approve', reject:'Reject', pending:'Pending',
        approved:'Approved', rejected:'Rejected',
        academyName:'Academy Name', tagline:'Tagline', description:'Description',
        address:'Address', coverImage:'Cover Image', uploadImage:'Click to upload image',
        changePass:'Change Admin Password', newPass:'New Password',
        teacherDashboard:'Teacher Dashboard', mySlots:'My Time Slots', addSlot:'Add Slot',
        myStudents:'My Students', meetLink:'Google Meet Link',
        addMeetLink:'Add Meet Link for this session', uploadMeetLink:'Upload Meet Link',
        slotAdded:'Slot added!', slotRemoved:'Slot removed.', meetLinkSaved:'Meet link saved!',
        teacherPhoto:'My Photo', overview:'Overview',
        Monday:'Monday', Tuesday:'Tuesday', Wednesday:'Wednesday',
        Thursday:'Thursday', Friday:'Friday', Saturday:'Saturday', Sunday:'Sunday',
      },
      ka: {
        home:'მთავარი', teachers:'მასწავლებლები', enroll:'რეგისტრაცია', login:'შესვლა',
        logout:'გამოსვლა', dashboard:'პანელი', admin:'ადმინი', mySchedule:'ჩემი განრიგი',
        students:'მოსწავლეები', save:'შენახვა', cancel:'გაუქმება', delete:'წაშლა',
        edit:'რედაქტირება', add:'დამატება', search:'ძიება', back:'უკან', submit:'გაგზავნა',
        loading:'იტვირთება...', confirm:'დადასტურება', close:'დახურვა', yes:'დიახ, წავშალო',
        actions:'მოქმედებები', name:'სახელი', email:'ელ-ფოსტა', phone:'ტელეფონი',
        subject:'საგანი', password:'პაროლი', photo:'ფოტო', bio:'ბიოგრაფია', day:'დღე',
        time:'დრო', status:'სტატუსი', date:'თარიღი', link:'ბმული', noData:'მონაცემები არ არის.',
        heroTitle:'ისწავლე შეზღუდვების გარეშე', heroTitleAccent:'ეილერის აკადემიაში',
        heroSub:'დაუკავშირდი გამოცდილ მასწავლებლებს, დაჯავშნე სესიები და დაიწყე სწავლის მოგზაურობა.',
        viewTeachers:'მასწავლებლები', enrollNow:'დარეგისტრირდი',
        ourTeachers:'ჩვენი მასწავლებლები', chooseTeacher:'აირჩიე მასწავლებელი და დაჯავშნე დრო',
        aboutUs:'ჩვენ შესახებ',
        enrollTitle:'მოსწავლის რეგისტრაცია', parentName:'მშობლის / მეურვის სახელი',
        studentName:'მოსწავლის სახელი', studentAge:'მოსწავლის ასაკი',
        chooseSubject:'საგნის არჩევა', chooseTeacher2:'მასწავლებლის არჩევა',
        chooseSlot:'დროის ჯავშნა', notes:'შენიშვნები (სურვილისამებრ)',
        enrollSuccess:'რეგისტრაცია გაიგზავნა! ადმინი მალე დაადასტურებს.',
        loginTitle:'სისტემაში შესვლა', loginAs:'შესვლა როგორც',
        adminLogin:'ადმინი', teacherLogin:'მასწავლებელი', username:'სახელი / ელ-ფოსტა',
        adminDashboard:'ადმინის პანელი', manageSubjects:'საგნები',
        manageTeachers:'მასწავლებლები', manageStudents:'მოსწავლეები',
        manageEnrollments:'რეგისტრაციები', siteSettings:'პარამეტრები',
        addSubject:'საგნის დამატება', addTeacher:'მასწავლებლის დამატება',
        subjectName:'საგნის სახელი', totalStudents:'სულ მოსწავლეები',
        totalTeachers:'სულ მასწავლებლები', totalSubjects:'სულ საგნები',
        pendingEnrollments:'მოლოდინის რეგისტრაციები',
        approve:'დამტკიცება', reject:'უარყოფა', pending:'განხილვაში',
        approved:'დამტკიცებული', rejected:'უარყოფილი',
        academyName:'აკადემიის სახელი', tagline:'სლოგანი', description:'აღწერა',
        address:'მისამართი', coverImage:'გარეკანის სურათი', uploadImage:'დააჭირე ასატვირთად',
        changePass:'ადმინის პაროლის შეცვლა', newPass:'ახალი პაროლი',
        teacherDashboard:'მასწავლებლის პანელი', mySlots:'ჩემი სლოტები', addSlot:'სლოტის დამატება',
        myStudents:'ჩემი მოსწავლეები', meetLink:'Google Meet ბმული',
        addMeetLink:'Meet ბმულის დამატება', uploadMeetLink:'Meet ბმულის ატვირთვა',
        slotAdded:'სლოტი დაემატა!', slotRemoved:'სლოტი წაიშალა.', meetLinkSaved:'ბმული შენახულია!',
        teacherPhoto:'ჩემი ფოტო', overview:'მიმოხილვა',
        Monday:'ორშაბათი', Tuesday:'სამშაბათი', Wednesday:'ოთხშაბათი',
        Thursday:'ხუთშაბათი', Friday:'პარასკევი', Saturday:'შაბათი', Sunday:'კვირა',
      }
    };
    return (T[this.current] && T[this.current][key]) || (T['en'] && T['en'][key]) || key;
  }
};

document.addEventListener('DOMContentLoaded', () => LANG.set(LANG.current));
