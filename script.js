// Digital Clock functionality
document.getElementById('year').textContent = new Date().getFullYear();

const time = document.getElementById('time');
const meridiem = document.getElementById('meridiem');
const date = document.getElementById('date');
const toggleFormatBtn = document.getElementById('toggle-format');
const formatBtnText = toggleFormatBtn.querySelector('span');
const toggleThemeBtn = document.getElementById('toggle-theme');
const footerAnchorTags = document.querySelectorAll('footer a');
let isHour12Format = true;
let currentThemeIndex = 0; // Track current theme

const colorThemes = [
    'from-blue-800 to-indigo-900',
    'from-pink-500 to-cyan-500',
    'from-green-500 to-green-900',
    'from-orange-500 to-red-600',
    'from-purple-600 to-pink-500'
];

function updateTime(isHour12FormatParam) {
    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: isHour12FormatParam
    };

    const timeString = now.toLocaleTimeString('en-US', options);

    if (isHour12FormatParam) {
        const [timePart, meridiemPart] = timeString.split(' ');
        time.textContent = timePart;
        meridiem.textContent = meridiemPart;
        meridiem.classList.remove('hidden');
    } else {
        time.textContent = timeString;  // 24-hour has no meridiem
        meridiem.classList.add('hidden');
    }
}

function updateDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const dateString = now.toLocaleDateString('en-US', options);
    date.textContent = dateString;
}

toggleFormatBtn.onclick = () => {
    if (formatBtnText.textContent == '24H Format') {
        formatBtnText.textContent = '12H Format';
        isHour12Format = false;
    }
    else if (formatBtnText.textContent == '12H Format') {
        formatBtnText.textContent = '24H Format';
        isHour12Format = true;
    }
    updateTime(isHour12Format);
}

toggleThemeBtn.onclick = () => {
    // Remove existing gradient classes
    document.body.classList.forEach(cls => {
        if (cls.startsWith('from-') || cls.startsWith('to-')) {
            document.body.classList.remove(cls);
        }
    });

    // Cycle through themes
    currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
    const selectedTheme = colorThemes[currentThemeIndex];

    // Apply new gradient classes
    const themeClasses = selectedTheme.split(' ');
    document.body.classList.add('bg-gradient-to-r', ...themeClasses);
};

// Initialize clock
setInterval(() => {
    updateTime(isHour12Format);
    updateDate();
}, 1000);

// Initial call to display time immediately
updateTime(isHour12Format);
updateDate();