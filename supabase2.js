// EcoBala - Supabase Client & Auth Helper - v20260310-2
// Requires: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>

const SUPABASE_URL  = 'https://zngfwsuaaygryzpmynuv.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZ2Z3c3VhYXlncnl6cG15bnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjA1NDksImV4cCI6MjA4ODUzNjU0OX0.M8Xx4DxYzWVN94ChFM5LDWrUdEi1jv1kk2JopcfpfrA';

const _PF_SB = (function(){
    try {
        return atob('0YXRg9C5LNGF0YPRjyzRhdGD0Y4s0YXRg9GP0Lws0YXRg9GP0LzQuCzRhdGD0LXQsizRhdGD0LnQvdGPLNGF0YPQudC90Y4s0L/QuNC30LTQsCzQv9C40LfQtNGLLNC/0LjQt9C00LXRhizQv9C40LfQtNCw0YIs0L/QuNC30LTQsNC90YPQuyzQv9C40LfQtNCw0L3Rg9GCLNC10LHQsNGC0Yws0LXQsdCw0Lss0LXQsdCw0LvQuCzQtdCx0LDQvdGL0Lks0LXQsdCw0L3Rg9GCLNC10LHQsNC90LDRjyzQtdCx0LDQvdGM0LrQvizRgdGD0LrQsCzRgdGD0LrQuCzRgdGD0LrQsNC8LNGB0YPQutC1LNGB0YPRh9C60LAs0YHRg9GH0LDRgCzQsdC70Y/RgtGMLNCx0LvRj9C00Yws0LHQu9GP0LTQtdC5LNCx0LvRj9C00LjQvSzQsdC70Y/QtNGB0Los0LHQu9GP0LTQuNC90LAs0LHQu9GP0LTRgdGC0LLQvizQvNGD0LTQsNC6LNC80YPQtNCw0LrQuCzQvNGD0LTQsNC60LDQvCzQvNGD0LTQuNC70LAs0LzRg9C00LjQuyzQt9Cw0LvRg9C/0LAs0LfQsNC70YPQv9C40L0s0ZHQsdCw0L0s0ZHQsdCw0L3Ri9C5LNGR0LEs0ZHQsdC90YPRgizRkdCx0L3Rg9C7LNGR0LHQvdGD0YLRjCzQv9C40LfQtNC10YLRjCzQv9C40LfQtNC40YIs0L/QuNC30LTQsNCx0L7QuyzQv9C40LfQtNCw0L3Rg9GC0Yws0YjQu9GO0YXQsCzRiNC70Y7RhdC4LNGI0LvRjtGF0LDQvCzQvNGA0LDQt9GMLNC80YDQsNC30Lgs0YPQtdCx0LDQvSzRg9GR0LHQsNC9LNGD0ZHQsSzQv9C40LfQtNGO0Los0L/QuNC30LfRjtC60Lgs0LPQsNC90LTQvtC9LNCz0LDQvdC00L7QvdGLLNC90LDRhdGD0Lks0L/QvtGF0YPQuSzQvdCw0YXQtdGALGFzcyxmdWNrLHNoaXQsYml0Y2gsY29jayxkaWNrLHB1c3N5LGN1bnQsbmlnZ2VyLGZhZ2dvdCzRgdC40LrQsNC6LNGB0LjQutGW0L0s0YHQuNC60Lgs0YHQuNC60LBxLNCx0L7SmyzQsdC+0LrRgtGLLNGI0LXRiNGW0qMs0YjQtdGI0LXSo9C00ZYs0YjQtdGI0LXSo9C90ZbSoyzQsdCw0LnSk9GL0Lcs0LHQsNC50pPRi9C30YvQvSzQuNGC0ZbSoyzQuNGC0YHRltKjLNC40YLRgtC10Lks0LjRgtC/0ZbQvSzQtdGB0LXQuizQtdGB0LXQs9GW0qMs0LXRgdC10LrRgdGW0qMs0L/Ri9GB0YvSmyzQv9GL0YjRi9C6LNC/0LXQt9C00LXRgizQv9GW0LfQtNC10YIs0LbQtdGB0ZbRgCzQttC10YHRltGA0LTQtdC5LNGB0LLQvtC70L7Rh9GMLNGD0LHQu9GO0LTQvtC6LNGD0LHQu9GO0LTQutC4LNC70L7RiNCw0Lo=').split(',');
    } catch(e) {
        return [];
    }
})();

function _containsProfanitySb(t) {
    if (!t) return false;
    const l = String(t).toLowerCase().replace(/[\s\-\.]+/g, '');
    return _PF_SB.some(function(w){
        return l.includes(String(w).toLowerCase().replace(/[\s\-\.]+/g, ''));
    });
}

function _enforceNoProfanitySb(values) {
    if (!Array.isArray(values)) return;
    for (var i = 0; i < values.length; i++) {
        var v = values[i];
        if (v && _containsProfanitySb(v)) {
            throw new Error('⚠️ Нельзя использовать такие слова! / ⚠️ Бұл сөзді қолдануға болмайды!');
        }
    }
}

// Lazy client — created on first use so window.supabase is guaranteed ready
let _sbClient = null;


function calcEcoLevel(pts) {
    // 100pts per level: 0=1, 100=2, 200=3, 300=4, 400=5, 500=6, 700=7, 1000=8
    if (pts < 100) return 1;
    if (pts < 200) return 2;
    if (pts < 300) return 3;
    if (pts < 400) return 4;
    if (pts < 500) return 5;
    if (pts < 700) return 6;
    if (pts < 1000) return 7;
    return 8;
}

function getSB() {
    if (!_sbClient) {
        if (!window.supabase) {
            throw new Error('supabase.min.js not loaded yet');
        }
        _sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
            auth: {
                persistSession: true,
                storageKey: 'ecobala-auth',
                storage: window.localStorage,
                autoRefreshToken: true,
                detectSessionInUrl: false
            }
        });
    }
    return _sbClient;
}
window.getSupabaseClient = function() { return getSB(); };

window.EcoBalaAuth = {

    registerKid: async function(userData) {
        console.log('registerKid start:', userData.email);
        _enforceNoProfanitySb([
            userData.fullName,
            userData.nickname,
            userData.child_name,
            userData.child_surname
        ]);
        var sb = getSB();
        var signUpResult = await sb.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: { data: { role: 'kids' } }
        });
        if (signUpResult.error) throw signUpResult.error;
        var authData = signUpResult.data;
        console.log('signUp done. hasSession:', !!authData.session, 'hasUser:', !!authData.user);

        var uid = authData.user.id;
        var insertResult = await sb.from('users').insert([{
            id: uid, email: userData.email, role: 'kids',
            full_name: userData.fullName || '',
            child_name: userData.child_name || '',
            child_surname: userData.child_surname || '',
            nickname: userData.nickname || '',
            age: userData.age || null,
            class: userData.class || '',
            school: userData.school || '',
            parent_phone: userData.parent_phone || '',
            points: 0, level: 1, badges: [], is_active: true
        }]).select().single();
        if (insertResult.error) throw insertResult.error;
        console.log('profile inserted');

        if (authData.session) {
            console.log('setting session...');
            await sb.auth.setSession(authData.session);
            console.log('session set OK');
        } else {
            console.log('NO SESSION - email confirm still on?');
        }
        return insertResult.data;
    },

    registerTeen: async function(userData) {
        console.log('registerTeen start:', userData.email);
        _enforceNoProfanitySb([
            userData.fullName,
            userData.nickname
        ]);
        var sb = getSB();
        var signUpResult = await sb.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: { data: { role: 'teen' } }
        });
        if (signUpResult.error) throw signUpResult.error;
        var authData = signUpResult.data;
        console.log('signUp done. hasSession:', !!authData.session, 'hasUser:', !!authData.user);

        var uid = authData.user.id;
        var insertResult = await sb.from('users').insert([{
            id: uid, email: userData.email, role: 'teen',
            full_name: userData.fullName || '',
            nickname: userData.nickname || '',
            age: userData.age || null,
            class: userData.class || '',
            school: userData.school || '',
            phone: userData.phone || '',
            points: 0, level: 1, badges: [], is_active: true
        }]).select().single();
        if (insertResult.error) throw insertResult.error;
        console.log('profile inserted');

        if (authData.session) {
            console.log('setting session...');
            await sb.auth.setSession(authData.session);
            console.log('session set OK');
        } else {
            console.log('NO SESSION - email confirm still on?');
        }
        return insertResult.data;
    },

    login: async function(email, password) {
        var sb = getSB();
        var result = await sb.auth.signInWithPassword({ email: email, password: password });
        if (result.error) throw result.error;
        var profileResult = await sb.from('users').select('*').eq('id', result.data.user.id).single();
        if (profileResult.error) throw profileResult.error;
        return profileResult.data;
    },

    logout: async function() {
        await getSB().auth.signOut().catch(function() {});
    },

    getCurrentUser: async function() {
        var CACHE_KEY = 'ecobala-user-cache';
        try {
            var sessionResult = await getSB().auth.getSession();
            var session = sessionResult.data.session;
            if (!session) {
                // Try to restore — Supabase sometimes needs a tick after reload
                await new Promise(function(r){ setTimeout(r, 300); });
                sessionResult = await getSB().auth.getSession();
                session = sessionResult.data.session;
            }
            if (!session) {
                console.log('getCurrentUser: no session');
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            var userResult = await getSB().auth.getUser();
            var user = userResult.data.user;
            if (!user) return null;
            var profileResult = await getSB().from('users').select('*').eq('id', user.id).single();
            var profile = profileResult.data || null;
            // Cache profile for instant restore on next reload
            if (profile) {
                try { localStorage.setItem(CACHE_KEY, JSON.stringify(profile)); } catch(e) {}
            }
            return profile;
        } catch(e) {
            console.error('getCurrentUser error:', e);
            // Return cached profile as fallback (for network issues)
            try {
                var cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    console.log('getCurrentUser: using cached profile');
                    return JSON.parse(cached);
                }
            } catch(e2) {}
            return null;
        }
    },

    requireRole: async function(role, redirectTo) {
        var user = await this.getCurrentUser();
        if (!user || user.role !== role) {
            window.location.href = redirectTo || 'index.html';
            return null;
        }
        return user;
    },

    autoRedirectIfLoggedIn: async function() {
        try {
            var user = await this.getCurrentUser();
            if (user) {
                console.log('autoRedirect: found user role=' + user.role);
                if (user.role === 'teen') window.location.href = 'teen.html';
                else if (user.role === 'kids') window.location.href = 'kids.html';
                else if (user.role === 'admin') window.location.href = 'admin.html';
            } else {
                console.log('autoRedirect: no user');
            }
        } catch(e) {
            console.error('autoRedirect error:', e);
        }
    }
};

window.EcoBalaDB = {

    getLeaderboard: async function(role) {
        var q = getSB().from('users')
            .select('id, full_name, nickname, child_name, child_surname, school, class, points, level, role, avatar_url')
            .order('points', { ascending: false }).limit(100);
        var result = role ? await q.eq('role', role) : await q;
        return (result.data || []).map(function(u) {
            return Object.assign({}, u, {
                name: u.nickname || (u.child_name ? (u.child_name + (u.child_surname ? ' ' + u.child_surname : '')).trim() : null) || u.full_name || 'Аноним',
                avatar: u.avatar_url || null
            });
        });
    },

    getAllUsers: async function() {
        var result = await getSB().from('users').select('*').order('points', { ascending: false });
        return result.data || [];
    },

    updateUser: async function(id, updates) {
        var result = await getSB().from('users').update(updates).eq('id', id).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteUser: async function(id) {
        var result = await getSB().from('users').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    getTeenReports: async function() {
        var result = await getSB().from('teen_reports').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveTeenReport: async function(report) {
        var result = await getSB().from('teen_reports').upsert([report]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteTeenReport: async function(id) {
        var result = await getSB().from('teen_reports').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    deleteTeenReportsByUser: async function(userId) {
        await getSB().from('teen_reports').delete().eq('user_id', userId);
    },

    getTeenQuests: async function() {
        var result = await getSB().from('teen_quests').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveTeenQuest: async function(quest) {
        var result = await getSB().from('teen_quests').upsert([quest]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteTeenQuest: async function(id) {
        var result = await getSB().from('teen_quests').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    getKidsLessons: async function() {
        var result = await getSB().from('kids_lessons').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveKidsLesson: async function(lesson) {
        var result = await getSB().from('kids_lessons').upsert([lesson]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteKidsLesson: async function(id) {
        var result = await getSB().from('kids_lessons').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    getKidsGames: async function() {
        var result = await getSB().from('kids_games').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveKidsGame: async function(game) {
        var result = await getSB().from('kids_games').upsert([game]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteKidsGame: async function(id) {
        var result = await getSB().from('kids_games').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    getTeenQuestTakes: async function() {
        var result = await getSB().from('teen_quest_takes').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveTeenQuestTake: async function(take) {
        var result = await getSB().from('teen_quest_takes').upsert([take]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    getTeenQuestReviews: async function() {
        var result = await getSB().from('teen_quest_reviews').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveTeenQuestReview: async function(review) {
        var result = await getSB().from('teen_quest_reviews').upsert([review]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },


    incrementLessonDone: async function(userId, pointsEarned) {
        var sb = getSB();
        var res = await sb.from('users').select('lessons_done, points, level, badges').eq('id', userId).single();
        if (res.error) throw res.error;
        var u = res.data;
        var newLessons = (u.lessons_done || 0) + 1;
        var newPts = (u.points || 0) + (pointsEarned || 0);
        var newLvl = calcEcoLevel(newPts);
        var badges = Array.isArray(u.badges) ? [...u.badges] : [];
        if (newLessons === 1 && !badges.includes('first')) badges.push('first');
        if (newLessons >= 5 && !badges.includes('student')) badges.push('student');
        if (newLessons >= 10 && !badges.includes('scholar')) badges.push('scholar');
        var upd = await sb.from('users').update({
            lessons_done: newLessons, points: newPts, level: newLvl, badges: badges
        }).eq('id', userId).select().single();
        if (upd.error) throw upd.error;
        return upd.data;
    },

    incrementQuestDone: async function(userId, pointsEarned) {
        var sb = getSB();
        var res = await sb.from('users').select('quests_done, reports_sent, points, level, badges').eq('id', userId).single();
        if (res.error) throw res.error;
        var u = res.data;
        var newQuests = (u.quests_done || 0) + 1;
        var newPts = (u.points || 0) + (pointsEarned || 0);
        var newLvl = calcEcoLevel(newPts);
        var badges = Array.isArray(u.badges) ? [...u.badges] : [];
        if (newQuests >= 1 && !badges.includes('explorer')) badges.push('explorer');
        if (newQuests >= 5 && !badges.includes('hero')) badges.push('hero');
        if (newQuests >= 10 && !badges.includes('champion')) badges.push('champion');
        var upd = await sb.from('users').update({
            quests_done: newQuests, reports_sent: (u.reports_sent||0)+1,
            points: newPts, level: newLvl, badges: badges
        }).eq('id', userId).select().single();
        if (upd.error) throw upd.error;
        return upd.data;
    },

    incrementGamePlayed: async function(userId, pointsEarned) {
        var sb = getSB();
        var res = await sb.from('users').select('games_played, points, level, badges').eq('id', userId).single();
        if (res.error) throw res.error;
        var u = res.data;
        var newGames = (u.games_played || 0) + 1;
        var newPts = (u.points || 0) + (pointsEarned || 0);
        var newLvl = calcEcoLevel(newPts);
        var badges = Array.isArray(u.badges) ? [...u.badges] : [];
        if (newGames >= 1 && !badges.includes('gamer')) badges.push('gamer');
        if (newGames >= 5 && !badges.includes('streak')) badges.push('streak');
        var upd = await sb.from('users').update({
            games_played: newGames, points: newPts, level: newLvl, badges: badges
        }).eq('id', userId).select().single();
        if (upd.error) throw upd.error;
        return upd.data;
    },

    getUserStats: async function(userId) {
        var res = await getSB().from('users')
            .select('points, level, badges, lessons_done, quests_done, games_played, reports_sent')
            .eq('id', userId).single();
        if (res.error) throw res.error;
        return res.data;
    },

    getDashboardStats: async function() {
        var results = await Promise.all([
            getSB().from('users').select('id, role, points, school'),
            getSB().from('teen_reports').select('id, status'),
            getSB().from('teen_quests').select('id'),
            getSB().from('kids_lessons').select('id')
        ]);
        var users   = results[0].data || [];
        var reports = results[1].data || [];
        var quests  = results[2].data || [];
        var lessons = results[3].data || [];
        var schoolMap = {};
        users.forEach(function(u) {
            var s = (u.school || '').trim();
            if (!s) return;
            if (!schoolMap[s]) schoolMap[s] = { score: 0, count: 0 };
            schoolMap[s].score += Number(u.points || 0);
            schoolMap[s].count += 1;
        });
        var schools = Object.entries(schoolMap)
            .map(function(e) { return Object.assign({ school: e[0] }, e[1]); })
            .sort(function(a, b) { return b.score - a.score; });
        return {
            users: users,
            kidsCount:   users.filter(function(u) { return u.role === 'kids'; }).length,
            teenCount:   users.filter(function(u) { return u.role === 'teen'; }).length,
            totalPoints: users.reduce(function(a, u) { return a + Number(u.points || 0); }, 0),
            topSchool:   schools[0] || null,
            reportCounts: { all: reports.length },
            questsCount:  quests.length,
            lessonsCount: lessons.length,
            schools: schools
        };
    }
};
