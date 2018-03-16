<template>
    <div class="picker-box">
        <div class="mask" @click="hideTimePicker"></div>
        <div class="picker-box-c">
            <div v-show="!showMonth" class="picker-header">
                <div class="picker-prev" @click="preMon"></div>
                <div class="picker-year" @click="showYearSelect">{{year}}年 {{month}}月</div>
                <div class="picker-next" @click="nextMon"></div>
            </div>
            <div v-show="showMonth" class="picker-header">
                <div class="picker-prev" @click="preYear"></div>
                <div class="picker-year">{{selectYear}}年 </div>
                <div class="picker-next" @click="nextYear"></div>
            </div>
            <div v-show="showMonth" class="year-select">
            	<div class="month-item" v-for="(item, index) in monthList" :key="index"
            		:class="{'curMonth': item.showMonth,
            		          'unselected' : item.unselected
                           }" @click="checkMonth(item)" >{{item.MonthNum}}</div>
            </div>
            <div v-show="!showMonth">
            	<div class="picker-content">
	                <div class="picker-week">
	                    <div class="picker-weekday">日</div>
	                    <div class="picker-weekday">一</div>
	                    <div class="picker-weekday">二</div>
	                    <div class="picker-weekday">三</div>
	                    <div class="picker-weekday">四</div>
	                    <div class="picker-weekday">五</div>
	                    <div class="picker-weekday">六</div>
	                </div>
	                <div class="picker-con">
	                    <div class="picker-day" v-for="pick in picker" 
	                        :class="{'outfocus': pick.outfocus, 
	                                'today': pick.showday, 
	                                'start': showStartEnvfun(pick.dateNum,pick.outfocus), 
	                                'end': showEndEnvfun(pick.dateNum,pick.outfocus), 
	                                'black': showBlack(pick.dateNum,pick.outfocus), 
	                                'half': showHalffun(pick.dateNum,pick.outfocus)}" 
	                        @click="checkDay(pick.dateNum,pick.outfocus)">
	                        {{pick.dateNum}}
	                    </div>
	                </div>
	            </div>
	            <div class="picker-footer">
	                <div class="picker-button-today"><span></span>今天</div>
	                <div class="picker-button-start"><span></span>开始</div>
	                <div class="picker-button-end"><span></span>结束</div>
	            </div>
	            <div class="confim" @click="confimDate">确定</div>
	            <div class="tip">提示：双击目标日期可选择日期</div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
    export default {
    	props: {
	        diffDate:Boolean
	    },
        data () {
            return {
            	monthList: [],
                year: '',
                month: '',
                startEnv: '', //开始日期
                endEnv: '',  //结束日期
                today: '',
                picker: [],
                showMonth: false,
                selectYear: ''
            }
        },
        mounted () {
            let date = new Date()
            this.year = date.getFullYear()
            this.month = date.getMonth() + 1
            this.today = date.getDate()
            this.startEnv = this.diffDate ? this.year + '-' + this.month + '-' + 1 : this.year + '-' + this.month + '-' + this.today
            this.endEnv = this.year + '-' + this.month + '-' + this.today
            
            
            this.selectYear=this.year
            
            
//          this.$emit('confirm', startEnv, endEnv)

            this.createCalendar(this.year, this.month)
            this.createMonth(this.selectYear,this.month)
        },
        methods: {
        	createMonth(year, month) {
        		this.monthList.length=0
        		let months=[]
                
        		for (var i = 1; i <= 12; i++) { 
        			let showMonth = ''
        			if(new Date().getFullYear() == year && new Date().getMonth() + 1 == i) {
	                    showMonth = true
	                } else {
	                    showMonth = false
	                }
                    if (new Date().getFullYear() == year && (new Date().getMonth() + 1) < i) {
                        months.push({
                            MonthNum: i,
                            unselected: true,
                            showMonth: showMonth
                        });
                    } else {
                        months.push({
                            MonthNum: i,
                            unselected: false,
                            showMonth: showMonth
                        });
                    }
                }
                this.monthList=months
                console.log('1')
        	},
            createCalendar (year, month) {
                this.picker = []
                let picks = []
                let currentMonth = ''
                if(new Date().getFullYear() == year && new Date().getMonth() + 1 == month) {
                    currentMonth = true
                } else {
                    currentMonth = false
                }
                let monthStartDate = this.getFirstDay(year, month)

                var lastMonthRestDay = new Date(year, month - 1, 0).getDate()
                //求上个月剩余多少天显示在本月
                for (var i = 0; i < monthStartDate; i++) {
                    picks.push({
                        dateNum: lastMonthRestDay,
                        outfocus: true
                    });
                    lastMonthRestDay--
                }

                picks = picks.reverse()

                let indexMoth = this.getMonthLen(year, month)
                //本月天数
                for (var i = 1; i <= indexMoth; i++) {
                    let showday = ''
                    if (currentMonth) {
                        if (this.today === i) {
                            showday = true;
                        } else {
                            showday = false;
                        }

                    }
                    if (currentMonth && this.today < i) {
                        picks.push({
                            dateNum: i,
                            outfocus: true,
                            showday: showday
                        });
                    } else {
                        picks.push({
                            dateNum: i,
                            outfocus: false,
                            showday: showday
                        });
                    }
                }
                let nextMonLen = 35 - picks.length
                //下月天数显示在本月
                for (var i = 1; i <= nextMonLen; i++) {
                    picks.push({
                        dateNum: i,
                        outfocus: true
                    })
                }
                this.picker = picks
            },
            preMon () {
//              if (this.year == new Date().getFullYear() && this.month <= new Date().getMonth() + 1) {
//                  return;
//              }
                this.month -= 1;
                if (this.month < 1) {
                    this.year -= 1;
                    this.month = 12;
                }
                this.createCalendar(this.year, this.month);
            },
            nextMon () {
            	if (this.year == new Date().getFullYear() && this.month >= new Date().getMonth() + 1) {
                    return;
                }
                 this.month += 1;
                if (this.month > 12) {
                    this.year = parseInt(this.year) + 1;
                    this.month = 1;
                }
                this.createCalendar(this.year, this.month);
            },
            showYearSelect() {
            	this.showMonth=true
            	this.selectYear=this.year
            	
            },
            preYear () {
                this.selectYear--
                this.createMonth(this.selectYear,this.month)
            },
            nextYear () {
            	if(this.selectYear>=(new Date().getFullYear())){
            		return
            	}
            	this.selectYear++
            	this.createMonth(this.selectYear,this.month)
            },
            checkMonth(item) {
            	if(!item.unselected){
            		this.showMonth=false
            		this.year=this.selectYear
            		this.month=item.MonthNum
            		this.createCalendar(this.year, this.month);
            	}
            },
            checkDay (dateNum, outfocus) {
                if(!outfocus) {
                    let check_day = this.year + '-' + this.month + '-' + dateNum;
                    if (this.dateCompare(this.endEnv, check_day) == 0) { //开始后
                        this.endEnv = check_day;
                        this.showEndEnvfun(dateNum);
                    } else if (this.dateCompare(this.endEnv, check_day) == 3) {  //点结束当天
                        this.startEnv = check_day;
                        this.showHalffun(dateNum)
                    } else if (this.dateCompare(this.startEnv, check_day) == 3) {  //点开始当天
                        this.endEnv = check_day;
                        this.showHalffun(dateNum);
                    } else if (this.dateCompare(this.startEnv, check_day) == 1) {
                        this.startEnv = check_day;
                        this.showStartEnvfun(dateNum);
                    } else if (this.dateCompare(this.startEnv, check_day) == 0 && this.dateCompare(this.endEnv, check_day) == 1) {
                        var disStartEnvLen = this.getDatePeriod(this.startEnv, check_day) - 1;
                        var disSEndEnvLen = this.getDatePeriod(this.endEnv, check_day) - 1;
                        if (disStartEnvLen > disSEndEnvLen) {
                            this.endEnv = check_day;
                            this.showEndEnvfun(dateNum);
                        } else {
                            this.startEnv = check_day;
                            this.showStartEnvfun(dateNum);
                        }
                    }
                }
            },
            //两个日期之间间隔多少天
            getDatePeriod: function (sDate1, sDate2) {
                var aDate, oDate1, oDate2, iDays;

                aDate = sDate1.split("-");
                oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为12-18-2016格式
                aDate = sDate2.split("-");
                oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);

                iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
                return iDays;
            },
            //获得每个月的天数
            getMonthLen: function (year, month) {
                let nextMonth = new Date(year, month, 1);
                nextMonth.setHours(nextMonth.getHours() - 1);
                return nextMonth.getDate();
            },
            //获得每个月第一天星期几   0：星期日，1：星期一
            getFirstDay: function (year, month) {
                let firstDay = new Date(year, month - 1, 1);
                return firstDay.getDay();
            },
            //获得每个月的天数
            getMonthLen: function (year, month) {
                let nextMonth = new Date(year, month, 1);
                nextMonth.setHours(nextMonth.getHours() - 1);
                return nextMonth.getDate();
            },
//          //计算距离今天的后两天日期
//          getTwoDay: function (date) {
////              let result = new Date((new Date(date)).getTime() + 2 * 24 * 60 * 60 * 1000);
//				let result = new Date((new Date(date)).getTime());
//              return result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate();
//          },
            //计算距离今天的后六天日期
//          getSixDay: function (date) {
////              let result = new Date((new Date(date)).getTime() + 6 * 24 * 60 * 60 * 1000);
//				let result = new Date((new Date(date)).getTime());
//              return result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate();
//          },
			markDate(date) {
				var year=date.split('-')[0]
				var month=date.split('-')[1]>9 ? date.split('-')[1] : '0'+date.split('-')[1]
				var day=date.split('-')[2]>9 ? date.split('-')[2] : '0'+date.split('-')[2]
				return year+'-'+month+'-'+day
			},
            confimDate () {
            	var startEnv=this.markDate(this.startEnv)
            	var endEnv=this.markDate(this.endEnv)
//              this.$store.dispatch('showTimePicker', false)
                this.$emit('confirm', startEnv, endEnv)
            },
            //比较两日期的大小
            dateCompare (date1, date2) {

                var str1 = [];
                var str2 = [];
                str1 = date1.split('-');
                str2 = date2.split('-');
                if (parseInt(str1[0]) == parseInt(str2[0]) && parseInt(str1[1]) == parseInt(str2[1]) && parseInt(str1[2]) == parseInt(str2[2])) {
                    return 3;
                } else {
                    if (parseInt(str1[0]) > parseInt(str2[0])) {
                        return 1;
                    } else if (parseInt(str1[0]) < parseInt(str2[0])) {
                        return 0;
                    } else {
                    }
                    if (parseInt(str1[1]) > parseInt(str2[1])) {
                        return 1;
                    } else if (parseInt(str1[1]) < parseInt(str2[1])) {
                        return 0;
                    } else {
                    }
                    if (parseInt(str1[2]) > parseInt(str2[2])) {
                        return 1;
                    } else if (parseInt(str1[2]) < parseInt(str2[2])) {
                        return 0;
                    } else {
                    }
                    return 0;
                }
            },
            showStartEnvfun (dateNum, outfocus) {
                if (!outfocus) {
                    if (this.startEnv == this.year + '-' + this.month + '-' + dateNum) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            showEndEnvfun (dateNum, outfocus) {
                if (!outfocus) {
                    if (this.endEnv == this.year + '-' + this.month + '-' + dateNum) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            showBlack (dateNum, outfocus) {
                if (!outfocus) {
                    if (this.dateCompare(this.startEnv, this.year + '-' + this.month + '-' + dateNum) == 0 &&
                        this.dateCompare(this.year + '-' + this.month + '-' + dateNum, this.endEnv) == 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            showHalffun (dateNum, outfocus) {
                if (!outfocus) {
                    if (this.startEnv == this.year + '-' + this.month + '-' + dateNum && this.endEnv == this.year + '-' + this.month + '-' + dateNum) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            hideTimePicker () {
                this.$emit('hideTimePicker')
            }
        },
        computed: {
            
        }
    }
</script>

<style scoped>

.picker-box {
    font-size: 14px
}

.picker-box .picker-box-c {
    position: fixed;
    background: #fff;
    width: 6.2rem;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    margin-top: -4.8rem;
    border-radius: 0.1rem;
    z-index: 1050;
    padding: 0 0.3rem;
}

.picker-box .picker-box-c .picker-header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 1rem;
    line-height: 1rem
}

.picker-box .picker-box-c .picker-header .picker-next,.picker-box .picker-box-c .picker-header .picker-prev {
    
    width: 1.5rem;
    text-align: center;
    position: relative;
}
.picker-box .picker-box-c .picker-header .picker-next:before{
	content: '';
	position: absolute;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../assets/image/direction.png) no-repeat center;
    background-size: 95% 95%;
    left: 0.2rem;
    top: 0.3rem;
    transform: rotate(180deg);
}
.picker-box .picker-box-c .picker-header .picker-prev:before{
	content: '';
	position: absolute;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../assets/image/direction.png) no-repeat center;
    background-size: 95% 95%;
    right: 0.2rem;
    top: 0.3rem;
}
.picker-box .picker-box-c .picker-header .picker-year {
    color: #000;
}

.picker-box .picker-box-c .picker-content .picker-week {
    display: -ms-flexbox;
    display: flex;
    padding: 0.1rem;
    background: #f4faff;
    color: #333;
}

.picker-box .picker-box-c .picker-content .picker-week .picker-weekday {
    width: 1rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center
}

.picker-box .picker-box-c .picker-content .picker-con {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
}

.picker-box .picker-box-c .picker-content .picker-con .picker-day {
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.1rem 0;
    colors: #333;
    text-align: center
}

.picker-box .picker-box-c .picker-content .picker-con .today:before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 8px solid #1486f5;
    border-left: 8px solid transparent
}

.picker-box .picker-box-c .picker-content .picker-con .start {
    background: #5ec443;
        color: #fff;
}

.picker-box .picker-box-c .picker-content .picker-con .black {
    background: #e2e2e2;

}

.picker-box .picker-box-c .picker-content .picker-con .end {
    background: #d44040;
    color: #fff;
}

.picker-box .picker-box-c .picker-content .picker-con .half {
    background: url(../assets/image/same-day.png) no-repeat;
    background-size: cover
}

.picker-box .picker-box-c .picker-content .picker-con .outfocus {
    color: #e3e3e3
}

.picker-box .picker-box-c .picker-footer {
    width: 90%;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0 auto;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #eee
}

.picker-box .picker-box-c .picker-footer>div {
    width: 33.33%;
    text-align: center
}

.picker-box .picker-box-c .picker-footer .picker-button-today span {
    width: 0;
    display: inline-block;
    margin-right: 0.2rem;
    border-top: 8px solid #0059bc;
    border-left: 8px solid transparent
}

.picker-box .picker-box-c .picker-footer .picker-button-end span,.picker-box .picker-box-c .picker-footer .picker-button-start span[data-v-3a1a27bb] {
    width: 0.4rem;
    height: 0.4rem;
    background: #5ec443;
    display: inline-block;
    margin-right: 0.2rem;
    vertical-align: middle;
    margin-bottom: 0.05rem
}

.picker-box .picker-box-c .picker-footer .picker-button-end span {
    background: #d44040
}

.picker-box .picker-box-c .confim {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 14px;
    color: #508CEE;
    cursor: pointer
}
.tip{
	padding: 0.1rem;
	text-align: left;
	color: #bbb;
	font-size: 0.24rem;
}

.picker-box .mask {
    position: fixed;
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1040;
    background: rgba(0,0,0,.6)
}
.year-select{
	display: flex;
	flex-wrap: wrap;
	padding: 0.3rem 0;
}
.month-item{
	position: relative;
	width: 33.33333%;
	text-align: center;
	padding: 0.45rem 0;
	color: #333;
	font-size: 0.28rem;
}
.month-item.curMonth{
	color: #fff;
}
.unselected{
	color: #e3e3e3;
}
.month-item.curMonth:before{
	content: '';
	position: absolute;
	width: 1rem;
	height: 1rem;
	left: 50%;
	top: 50%;
	margin-left: -0.5rem;
	margin-top: -0.5rem;
	background: #508cee;
	z-index: -1;
}
</style>