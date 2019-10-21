<script>
    export default {
        mounted() {
            let num1 = this.mulWay(1.1, 141.24); // 解决 JS(加减乘除)运算精度丢失问题
            let num2 = this.retainDec(num1, 4, true); // 保留两位小数(四舍五入/非四舍五入)
            console.log(num1);
            console.log(num2);
        },
        methods: {
            /*
            * @param a {number} 运算数1
            * @param b {number} 运算数2
            * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
            */
            // 加法
            addWay: function(a, b) {
                return this.operation(a, b, 'add')
            },

            // 减法
            subWay: function(a, b) {
                return this.operation(a, b, 'subtract')
            },

            // 乘法
            mulWay: function(a, b) {
                return this.operation(a, b, 'multiply')
            },

            // 除法
            divWay: function(a, b) {
                return this.operation(a, b, 'divide')
            },

            /*
             * 核心方法，实现加减乘除运算，确保不丢失精度
             * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
             */
            operation: function(a, b, op) {
                let o1 = this.toInteger(a);
                let o2 = this.toInteger(b);
                let n1 = o1.num;
                let n2 = o2.num;
                let t1 = o1.times;
                let t2 = o2.times;
                let max = t1 > t2 ? t1 : t2;
                let result = null;

                switch (op) {
                    case 'add':
                        if (t1 === t2) { // 两个小数位数相同
                            result = n1 + n2
                        } else if (t1 > t2) { // o1 小数位 大于 o2
                            result = n1 + n2 * (t1 / t2)
                        } else { // o1 小数位 小于 o2
                            result = n1 * (t2 / t1) + n2
                        };
                        return result / max
                    case 'subtract':
                        if (t1 === t2) {
                            result = n1 - n2
                        } else if (t1 > t2) {
                            result = n1 - n2 * (t1 / t2)
                        } else {
                            result = n1 * (t2 / t1) - n2
                        };
                        return result / max
                    case 'multiply':
                        result = (n1 * n2) / (t1 * t2);
                        return result
                    case 'divide':
                        result = (n1 / n2) * (t2 / t1);
                        return result
                }
            },

            /*
             * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
             * @param floatNum {number} 小数
             * @return {object}
             * {times:100, num: 314}
             */
            toInteger: function(floatNum) {
                let ret = {
                    times: 1,
                    num: 0
                };
                let isNegative = floatNum < 0;
                if (this.isInteger(floatNum)) {
                    ret.num = floatNum;
                    return ret
                };
                let strfi  = floatNum + '';
                let dotPos = strfi.indexOf('.');
                let len    = strfi.substr(dotPos+1).length;
                let times  = Math.pow(10, len);
                let intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
                ret.times  = times;
                if (isNegative) {
                    intNum = -intNum
                };
                ret.num = intNum;
                return ret
            },

            /*
             * 判断obj是否为一个整数
             */
            isInteger: function(obj) {
                return Math.floor(obj) === obj
            },

            /*
            * 保留小数点后几位数
            * @param a {number}  需要进行保留的数值
            * @param b {number}  保留几位小数
            * @param s {Boolean} 是否进行 四舍五入操作
            */
            retainDec: function(a, b, s) {
                let n = '1';
                if (s) {
                  return a.toFixed(b)
                } else {
                    for (let i = 0; i < b; i++) {
                        n += '0'
                    };
                  return  Math.floor(a * parseInt(n)) / parseInt(n)
                }
            }
        }
    };
</script>
