/*
 * @Author: Shawn C 111708216+guochengcai@users.noreply.github.com
 * @Date: 2022-08-28 17:34:51
 * @LastEditors: Shawn C 111708216+guochengcai@users.noreply.github.com
 * @LastEditTime: 2022-08-30 11:09:32
 * @FilePath: /guochengcai.github.io/js/time.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function init_life_time() {
    function getAsideLifeTime() {
        /* 当前时间戳 */
        let nowDate = +new Date();
        /* 今天开始时间戳 */
        let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
        /* 今天已经过去的时间 */
        let todayPassHours = (nowDate - todayStartDate) / 1000 / 60 / 60;
        /* 今天已经过去的时间比 */
        let todayPassHoursPercent = (todayPassHours / 24) * 100;
        $('#dayProgress .date-text span').html(parseInt(todayPassHours));
        $('#dayProgress .progress .progress-bar').css('width', parseInt(todayPassHoursPercent) + '%');
        $('#dayProgress .progress .progress-bar').html(parseInt(todayPassHoursPercent) + '%');
        /* 当前周几 */
        let weeks = {
            0: 7,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6
        };
        let weekDay = weeks[new Date().getDay()];
        let weekDayPassPercent = (weekDay / 7) * 100;
        $('#weekProgress .date-text span').html(weekDay);
        $('#weekProgress .progress .progress-bar').css('width', parseInt(weekDayPassPercent) + '%');
        $('#weekProgress .progress .progress-bar').html(parseInt(weekDayPassPercent) + '%');
        /* 月 */
        let year = new Date().getFullYear();
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let monthAll = new Date(year, month, 0).getDate();
        let monthPassPercent = (date / monthAll) * 100;
        $('#monthProgress .date-text span').html(date);
        $('#monthProgress .progress .progress-bar').css('width', parseInt(monthPassPercent) + '%');
        $('#monthProgress .progress .progress-bar').html(parseInt(monthPassPercent) + '%');
        /* 年 */
        let yearPass = (month / 12) * 100;
        $('#yearProgress .date-text span').html(month);
        $('#yearProgress .progress .progress-bar').css('width', parseInt(yearPass) + '%');
        $('#yearProgress .progress .progress-bar').html(parseInt(yearPass) + '%');
    }
    getAsideLifeTime();
    setInterval(() => {
        getAsideLifeTime();
    }, 1000);
}
init_life_time()

now = new Date(), hour = now.getHours()
if (hour < 6) {
    var hello = "宝宝，凌晨好";
} else if (hour < 9) {
    var hello = "宝宝，早上好";
} else if (hour < 12) {
    var hello = "宝宝，上午好";
} else if (hour < 14) {
    var hello = "宝宝，中午好";
} else if (hour < 17) {
    var hello = "宝宝，下午好";
} else if (hour < 19) {
    var hello = "宝宝，傍晚好";
} else if (hour < 22) {
    var hello = "宝宝，晚上好";
} else {
    var hello = "宝宝，夜深了";
}