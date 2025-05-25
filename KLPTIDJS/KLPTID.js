/**
 * 浏览器模式枚举，用于控制跳转链接的参数规则
 * @typedef {Object} BrowserMode
 * @property {number} MOBILE - 移动端模式，对应链接参数值为 2
 * @property {string} DESKTOP - 桌面端模式，对应链接参数值为 'no'
*/
const BROWSER_MODE = {
    MOBILE: 2,
    DESKTOP: 'no'
};

/**
 * 跳转的浏览器网址
 * @typedef {Object} WEBSITE_CONFIG
 * @property {string} MAIN - 访问的主网址
 * @property {Object} PATH - 访问地址集
 * @property {string} PATH.POST - 访问帖子的地址
 * @property {string} PATH.USER_SPACE - 访问用户空间的地址
*/
const WEBSITE_CONFIG = {
    MAIN: 'https://klpbbs.com',
    PATH: {
        POST: '/thread-TID-1-1.html?mobile=MODE',
        USER_SPACE: '/home.php?mod=space&uid=UID&do=profile&mobile=MODE'
    }
};

/**
 * 界面文本
 * @typedef {Object} UI_TEXT
 * @property {Object} BASE - 基础(通用)文本
 * @property {string} BASE.ERROR_INVALID_VALUE - 无效值提示
 * - 以下TIDSKIPPER1、TIDSKIPPER2等是对应跳转器的文本
*/
const UI_TEXT = {
    BASE: {
        ERROR_INVALID_VALUE: '不可以输入非整数等无效值，或无输入内容'
    },
    TIDSKIPPER1: {
        INPUT_PLACEHOLDER: '输入主题TID',
        BUTTON: '跳转'
    },
    TIDSKIPPER2: {
        INPUT_PLACEHOLDER: '输入主题TID',
        BUTTON: '跳转',
        MODE: {
            MOBILE: '以移动端界面访问',
            DESKTOP: '以电脑端界面访问'
        }
    },
    USERSKIPPER1: {
        INPUT_PLACEHOLDER: '输入用户UID',
        BUTTON: '跳转'
    },
    USERSKIPPER2: {
        INPUT_PLACEHOLDER: '输入用户UID',
        BUTTON: '跳转',
        MODE: {
            MOBILE: '以移动端界面访问',
            DESKTOP: '以电脑端界面访问'
        }
    }
};

const ELEMENT_CLASS_NAMES = {
    TIDSKIPPER1: {
        CONTAINER: 'tid-skipper-v1',
        INPUT: 'skip-input1',
        BUTTON: 'skip-button1'
    },
    TIDSKIPPER2: {
        CONTAINER: 'tid-skipper-v2',
        INPUT: 'skip-input2',
        BUTTON: 'skip-button2',
        MODE_SWITCHER: 'mode-switcher2'
    },
    USERSKIPPER1: {
        CONTAINER: 'user-skipper-v2',
        INPUT: 'skip-input3',
        BUTTON: 'skip-button3'
    },
    USERSKIPPER2: {
        CONTAINER: 'user-skipper-v2',
        INPUT: 'skip-input4',
        BUTTON: 'skip-button4',
        MODE_SWITCHER: 'mode-switcher4'
    }
};

/**
 * 基础跳转器配置类型
 * @typedef {Object} BaseSkipperConfig
 * @property {string} containerClass - 容器元素类名
 * @property {string} inputClass - 输入框元素类名
 * @property {string} inputPlaceholder - 输入框占位提示文本
 */
class BaseSkipper {
    /**
     * 基础跳转器构造函数
     * @param {BaseSkipperConfig} config - 组件配置对象
     * @property {string} config.containerClass - 容器元素类名
     * @property {string} config.inputClass - 输入框元素类名 
     * @property {string} config.inputPlaceholder - 输入框占位符文本
     */
    constructor(config) {
        this.config = config;
        this.initElements();
        this.SKIPPER_ORDER = 0;
    }

    // 初始化元素，容器和输入框
    initElements() {
        this.container = this.createContainer();
        this.input = this.createInput();
        this.container.append(this.input);
    }
    
    // 创建容器
    createContainer() {
        const div = document.createElement('div');
        div.className = this.config.containerClass;
        return div;
    }
    
    // 创建输入框
    createInput() {
        const input = document.createElement('textarea');
        input.className = this.config.inputClass;
        input.placeholder = this.config.inputPlaceholder;
        return input;
    }
    
    /**
     * 返回是否为有效的值
     * @param {string} value - 原始输入文本
     * @returns {number|null}
         - 成功: 返回正整数(自动转换字符串数字)
         - 失败: 返回null(输入为非整数或空输入)
     */
    validateTID(value) {
        const inputValue = Number(value.trim());
        return isNaN(inputValue) ? null : inputValue;
    }
}

class TidSkipper1 extends BaseSkipper {
    constructor() {
        super({
            containerClass: ELEMENT_CLASS_NAMES.TIDSKIPPER1.CONTAINER,
            inputClass: ELEMENT_CLASS_NAMES.TIDSKIPPER1.INPUT,
            inputPlaceholder: UI_TEXT.TIDSKIPPER1.INPUT_PLACEHOLDER
        });
        this.initButton();
        document.body.appendChild(this.container);
        this.SKIPPER_ORDER = 1;
    }

    initButton() {
        // 创建跳转按钮
        const button = document.createElement('button');
        button.className = ELEMENT_CLASS_NAMES.TIDSKIPPER1.BUTTON;
        button.textContent = UI_TEXT.TIDSKIPPER1.BUTTON;
        button.addEventListener('click', () => this.handleJump());
        this.container.appendChild(button);
    }

    handleJump() {
        // 跳转链接
        const tid = this.validateTID(this.input.value);
        if (!tid) return alert(UI_TEXT.BASE.ERROR_INVALID_VALUE);
        let path = WEBSITE_CONFIG.PATH.POST
            .replace('TID', tid)
            .replace('MODE', 2);
        window.location.href = `${WEBSITE_CONFIG.MAIN}${path}`;
    }
}

class TidSkipper2 extends BaseSkipper {
    constructor() {
        super({
            containerClass: ELEMENT_CLASS_NAMES.TIDSKIPPER2.CONTAINER,
            inputClass: ELEMENT_CLASS_NAMES.TIDSKIPPER2.INPUT,
            inputPlaceholder: UI_TEXT.TIDSKIPPER2.INPUT_PLACEHOLDER
        });
        this.defaultMode = BROWSER_MODE.MOBILE;
        this.initButton();
        document.body.appendChild(this.container);
        this.SKIPPER_ORDER = 2;
    }

    initButton() {
        // 创建（浏览器）访问模式切换按钮
        this.modeSwitcher = document.createElement('button');
        this.modeSwitcher.className = ELEMENT_CLASS_NAMES.TIDSKIPPER2.MODE_SWITCHER;
        this.modeSwitcher.textContent = UI_TEXT.TIDSKIPPER2.MODE.MOBILE;
        this.modeSwitcher.addEventListener('click', () => this.modeChange());

        // 创建跳转按钮
        const button = document.createElement('button');
        button.className = ELEMENT_CLASS_NAMES.TIDSKIPPER2.BUTTON;
        button.textContent = UI_TEXT.TIDSKIPPER2.BUTTON;
        button.addEventListener('click', () => this.handleJump());

        this.container.append(this.modeSwitcher, button);
    }
    
    /**
     * 处理模式切换事件
     * - 在移动端/桌面端模式间切换
     * - 自动更新按钮显示文本
     * @listens MouseEvent 按钮点击事件
     */
    modeChange() {
        // 状态切换逻辑
        this.defaultMode = this.defaultMode === BROWSER_MODE.MOBILE
            ? BROWSER_MODE.DESKTOP
            : BROWSER_MODE.MOBILE;
        
        // UI文本同步逻辑
        this.modeSwitcher.textContent = this.defaultMode === BROWSER_MODE.MOBILE
            ? UI_TEXT.TIDSKIPPER2.MODE.MOBILE
            : UI_TEXT.TIDSKIPPER2.MODE.DESKTOP;
    }
    
    handleJump() {
        // 跳转链接
        const tid = this.validateTID(this.input.value);
        if (!tid) return alert(UI_TEXT.BASE.ERROR_INVALID_VALUE);
        let path = WEBSITE_CONFIG.PATH.POST
            .replace('TID', tid)
            .replace('MODE', this.defaultMode);
        window.location.href = `${WEBSITE_CONFIG.MAIN}${path}`;
    }
}

class UserSkipper1 extends BaseSkipper {
    constructor() {
        super({
            containerClass: ELEMENT_CLASS_NAMES.USERSKIPPER1.CONTAINER,
            inputClass: ELEMENT_CLASS_NAMES.USERSKIPPER1.INPUT,
            inputPlaceholder: UI_TEXT.USERSKIPPER1.INPUT_PLACEHOLDER
        });
        this.initButton();
        document.body.appendChild(this.container);
        this.SKIPPER_ORDER = 3;
    }

    initButton() {
        // 创建跳转按钮
        const button = document.createElement('button');
        button.className = ELEMENT_CLASS_NAMES.USERSKIPPER1.BUTTON;
        button.textContent = UI_TEXT.USERSKIPPER1.BUTTON;
        button.addEventListener('click', () => this.handleJump());
        this.container.appendChild(button);
    }

    handleJump() {
        // 跳转链接
        const uid = this.validateTID(this.input.value);
        if (!uid) return alert(UI_TEXT.BASE.ERROR_INVALID_VALUE);
        let path = WEBSITE_CONFIG.PATH.USER_SPACE
            .replace('UID', uid)
            .replace('MODE', 2);
        window.location.href = `${WEBSITE_CONFIG.MAIN}${path}`;
    }
}

class UserSkipper2 extends BaseSkipper {
    constructor() {
        super({
            containerClass: ELEMENT_CLASS_NAMES.USERSKIPPER2.CONTAINER,
            inputClass: ELEMENT_CLASS_NAMES.USERSKIPPER2.INPUT,
            inputPlaceholder: UI_TEXT.USERSKIPPER2.INPUT_PLACEHOLDER
        });
        this.defaultMode = BROWSER_MODE.MOBILE;
        this.initButton();
        document.body.appendChild(this.container);
        this.SKIPPER_ORDER = 4;
    }

    initButton() {
        // 创建（浏览器）访问模式切换按钮
        this.modeSwitcher = document.createElement('button');
        this.modeSwitcher.className = ELEMENT_CLASS_NAMES.USERSKIPPER2.MODE_SWITCHER;
        this.modeSwitcher.textContent = UI_TEXT.USERSKIPPER2.MODE.MOBILE;
        this.modeSwitcher.addEventListener('click', () => this.modeChange());

        // 创建跳转按钮
        const button = document.createElement('button');
        button.className = ELEMENT_CLASS_NAMES.TIDSKIPPER2.BUTTON;
        button.textContent = UI_TEXT.USERSKIPPER2.BUTTON;
        button.addEventListener('click', () => this.handleJump());

        this.container.append(this.modeSwitcher, button);
    }
    
    /**
     * 处理模式切换事件
     * - 在移动端/桌面端模式间切换
     * - 自动更新按钮显示文本
     * @listens MouseEvent 按钮点击事件
     */
    modeChange() {
        // 状态切换逻辑
        this.defaultMode = this.defaultMode === BROWSER_MODE.MOBILE
            ? BROWSER_MODE.DESKTOP
            : BROWSER_MODE.MOBILE;
        
        // UI文本同步逻辑
        this.modeSwitcher.textContent = this.defaultMode === BROWSER_MODE.MOBILE
            ? UI_TEXT.USERSKIPPER2.MODE.MOBILE
            : UI_TEXT.USERSKIPPER2.MODE.DESKTOP;
    }
    
    handleJump() {
        // 跳转链接
        const uid = this.validateTID(this.input.value);
        if (!uid) return alert(UI_TEXT.BASE.ERROR_INVALID_VALUE);
        let path = WEBSITE_CONFIG.PATH.USER_SPACE
            .replace('UID', uid)
            .replace('MODE', this.defaultMode);
        window.location.href = `${WEBSITE_CONFIG.MAIN}${path}`;
    }
}