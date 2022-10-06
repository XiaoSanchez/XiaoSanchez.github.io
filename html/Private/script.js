"use strict";
var UserStatus;
(function (UserStatus) {
    UserStatus["LoggedIn"] = "Logged In";
    UserStatus["LoggingIn"] = "Logging In";
    UserStatus["LoggedOut"] = "Logged Out";
    UserStatus["LogInError"] = "Log In Error";
    UserStatus["VerifyingLogIn"] = "Verifying Log In";
})(UserStatus || (UserStatus = {}));
var Default;
(function (Default) {
    Default["PIN"] = "0731";
})(Default || (Default = {}));
const defaultPosition = () => ({
    left: 0,
    x: 0
});
const N = {
    clamp: (min, value, max) => Math.min(Math.max(min, value), max),
    rand: (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
};
const T = {
    format: (date) => {
        const hours = T.formatHours(date.getHours()), minutes = date.getMinutes(), seconds = date.getSeconds();
        return `${hours}:${T.formatSegment(minutes)}`;
    },
    formatHours: (hours) => {
        return hours % 12 === 0 ? 12 : hours % 12;
    },
    formatSegment: (segment) => {
        return segment < 10 ? `0${segment}` : segment;
    }
};
const LogInUtility = {
    verify: async (pin) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (pin === Default.PIN) {
                    resolve(true);
                }
                else {
                    reject(`Invalid pin: ${pin}`);
                }
            }, N.rand(300, 700));
        });
    }
};
const useCurrentDateEffect = () => {
    const [date, setDate] = React.useState(new Date());
    React.useEffect(() => {
        const interval = setInterval(() => {
            const update = new Date();
            if (update.getSeconds() !== date.getSeconds()) {
                setDate(update);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [date]);
    return date;
};
const ScrollableComponent = (props) => {
    const ref = React.useRef(null);
    const [state, setStateTo] = React.useState({
        grabbing: false,
        position: defaultPosition()
    });
    const handleOnMouseDown = (e) => {
        setStateTo(Object.assign(Object.assign({}, state), { grabbing: true, position: {
                x: e.clientX,
                left: ref.current.scrollLeft
            } }));
    };
    const handleOnMouseMove = (e) => {
        if (state.grabbing) {
            const left = Math.max(0, state.position.left + (state.position.x - e.clientX));
            ref.current.scrollLeft = left;
        }
    };
    const handleOnMouseUp = () => {
        if (state.grabbing) {
            setStateTo(Object.assign(Object.assign({}, state), { grabbing: false }));
        }
    };
    return (React.createElement("div", { ref: ref, className: classNames("scrollable-component", props.className), id: props.id, onMouseDown: handleOnMouseDown, onMouseMove: handleOnMouseMove, onMouseUp: handleOnMouseUp, onMouseLeave: handleOnMouseUp }, props.children));
};
const Reminder = () => {
    return (React.createElement("div", { className: "reminder" },
        React.createElement("div", { className: "reminder-icon" },
            React.createElement("i", { className: "fa-regular fa-bell" })),
        React.createElement("span", { className: "reminder-text" },
            "今天想哥哥了吗？",
            React.createElement("span", { className: "reminder-time" }, "(๑´ㅂ`๑) "))));
};
const Time = () => {
    const date = useCurrentDateEffect();
    return (React.createElement("span", { className: "time" }, T.format(date)));
};
const Info = (props) => {
    return (React.createElement("div", { id: props.id, className: "info" },
        React.createElement(Time, null)));
};
const PinDigit = (props) => {
    const [hidden, setHiddenTo] = React.useState(false);
    React.useEffect(() => {
        if (props.value) {
            const timeout = setTimeout(() => {
                setHiddenTo(true);
            }, 500);
            return () => {
                setHiddenTo(false);
                clearTimeout(timeout);
            };
        }
    }, [props.value]);
    return (React.createElement("div", { className: classNames("app-pin-digit", { focused: props.focused, hidden }) },
        React.createElement("span", { className: "app-pin-digit-value" }, props.value || "")));
};
const Pin = () => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    const [pin, setPinTo] = React.useState("");
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (userStatus === UserStatus.LoggingIn || userStatus === UserStatus.LogInError) {
            ref.current.focus();
        }
        else {
            setPinTo("");
        }
    }, [userStatus]);
    React.useEffect(() => {
        if (pin.length === 4) {
            const verify = async () => {
                try {
                    setUserStatusTo(UserStatus.VerifyingLogIn);
                    if (await LogInUtility.verify(pin)) {
                        setUserStatusTo(UserStatus.LoggedIn);
                    }
                }
                catch (err) {
                    console.error(err);
                    setUserStatusTo(UserStatus.LogInError);
                }
            };
            verify();
        }
        if (userStatus === UserStatus.LogInError) {
            setUserStatusTo(UserStatus.LoggingIn);
        }
    }, [pin]);
    const handleOnClick = () => {
        ref.current.focus();
    };
    const handleOnCancel = () => {
        setUserStatusTo(UserStatus.LoggedOut);
    };
    const handleOnChange = (e) => {
        if (e.target.value.length <= 4) {
            setPinTo(e.target.value.toString());
        }
    };
    const getCancelText = () => {
        return (React.createElement("span", { id: "app-pin-cancel-text", onClick: handleOnCancel }, "Cancel"));
    };
    const getErrorText = () => {
        if (userStatus === UserStatus.LogInError) {
            return (React.createElement("span", { id: "app-pin-error-text" }, "Invalid"));
        }
    };
    return (React.createElement("div", { id: "app-pin-wrapper" },
        React.createElement("input", { disabled: userStatus !== UserStatus.LoggingIn && userStatus !== UserStatus.LogInError, id: "app-pin-hidden-input", maxLength: 4, ref: ref, type: "number", value: pin, onChange: handleOnChange }),
        React.createElement("div", { id: "app-pin", onClick: handleOnClick },
            React.createElement(PinDigit, { focused: pin.length === 0, value: pin[0] }),
            React.createElement(PinDigit, { focused: pin.length === 1, value: pin[1] }),
            React.createElement(PinDigit, { focused: pin.length === 2, value: pin[2] }),
            React.createElement(PinDigit, { focused: pin.length === 3, value: pin[3] })),
        React.createElement("h3", { id: "app-pin-label" },
            "我们确认关系纪念日 ",
            getErrorText(),
            " ",
            getCancelText())));
};
const MenuSection = (props) => {
    const getContent = () => {
        if (props.scrollable) {
            return (React.createElement(ScrollableComponent, { className: "menu-section-content" }, props.children));
        }
        return (React.createElement("div", { className: "menu-section-content" }, props.children));
    };
    return (React.createElement("div", { id: props.id, className: "menu-section" },
        React.createElement("div", { className: "menu-section-title" },
            React.createElement("i", { className: props.icon }),
            React.createElement("span", { className: "menu-section-title-text" }, props.title)),
        getContent()));
};
const QuickNav = () => {
    const getItems = () => {
        return [{
                id: 1,
                label: "纪念日",
                href: "http://www.xiao-cheng.site/html/Private/Dates.html"
            }, {
                id: 2,
                label: "相册集",
                href: "http://www.xiao-cheng.site/html/Private/Album.html"
            }, {
                id: 3,
                label: "点菜单",
                href: "http://www.xiao-cheng.site/html/Private/Menu.html"
            }, {
                id: 4,
                label: "故事会",
                href: "http://www.xiao-cheng.site/html/Private/stories/Story.html"
            }].map((item) => {
            return (React.createElement("div", { key: item.id, className: "quick-nav-item clear-button" },
                React.createElement("a", {href: item.href, className: "quick-nav-item-label" }, item.label)));
        });
    };
    return (React.createElement(ScrollableComponent, { id: "quick-nav" }, getItems()));
};
const Tools = () => {
    const getTools = () => {
        return [{
                icon: "fa-solid fa-cloud-sun",
                id: 1,
                image: "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                label: "天气",
                name: "天气预报功能",
                href: "https://m.tianqi.com/pingshanxian/"
            }, {
                icon: "fa-solid fa-calculator-simple",
                id: 2,
                image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FsY3VsYXRvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "计算器",
                name: "高数N级计算器",
                href: "https://www.desmos.com/scientific"
            }, {
                icon: "fa-solid fa-piggy-bank",
                id: 3,
                image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmFua3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "记账",
                name: "宝宝的账本",
                href: "http://www.kbledger.com/default.aspx"
            }, {
                icon: "fa-solid fa-plane",
                id: 4,
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                label: "旅游",
                name: "和宝宝的旅游计划",
                href: "./itinerary/index.html"
            }, {
                icon: "fa-solid fa-gamepad-modern",
                id: 5,
                image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "游戏",
                name: "打发时间小游戏",
                href: "./Game/index.html"
            }, {
                icon: "fa-solid fa-video",
                id: 6,
                image: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpZGVvJTIwY2hhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "联系",
                name: "紧急联系哥哥",
                href: "./emergency/index.html"
            }].map((tool) => {
            const styles = {
                backgroundImage: `url(${tool.image})`
            };
            return (React.createElement("a", { key: tool.id, href: tool.href, className: "tool-card" },
                React.createElement("div", { className: "tool-card-background background-image", style: styles }),
                React.createElement("div", { className: "tool-card-content" },
                    React.createElement("div", { className: "tool-card-content-header" },
                        React.createElement("span", { className: "tool-card-label" }, tool.label),
                        React.createElement("span", { className: "tool-card-name" }, tool.name)),
                    React.createElement("i", { className: classNames(tool.icon, "tool-card-icon") }))));
        });
    };
    return (React.createElement(MenuSection, { icon: "fa-solid fa-toolbox", id: "tools-section", title: "功能工具箱" }, getTools()));
};
const Restaurants = () => {
    const getRestaurants = () => {
        return [{
                desc: "肥肉丁的油脂搭配澳洲和牛肉饼，还搭配了黑松露，法国的车轮奶酪，香浓又衬托出牛肉的香味～",
                id: 1,
                image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                title: "黑松露和牛汉堡"
            }, {
                desc: "Gelato大部分选用了牛奶，因此吃起来有牛奶般的顺滑感，口感更加清爽，质地非常密实细腻。",
                id: 2,
                image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aWNlJTIwY3JlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                title: "意式Gelato"
            }, {
                desc: "小厨独家配方，甜而不腻，猪肉的鲜美，搭配山楂茶叶既中和了油腻，又色泽鲜亮、鲜嫩多汁～",
                id: 3,
                image: "https://pic3.zhimg.com/80/v2-1712a19242d3adc7b60bea021835105e_1440w.jpg",
                title: "小厨山楂红烧肉"
            }, {
                desc: "采用法国鹅肝，日本松露，德国火腿，中国羊肚菌，燕翅鲍参等食材，互相中和小火慢煮制成。",
                id: 4,
                image: "data:image/jpeg;base64,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",
                title: "小厨特制佛跳墙"
            }].map((restaurant) => {
            const styles = {
                backgroundImage: `url(${restaurant.image})`
            };
            return (React.createElement("div", { key: restaurant.id, className: "restaurant-card background-image", style: styles },
                React.createElement("div", { className: "restaurant-card-content" },
                    React.createElement("div", { className: "restaurant-card-content-items" },
                        React.createElement("span", { className: "restaurant-card-title" }, restaurant.title),
                        React.createElement("span", { className: "restaurant-card-desc" }, restaurant.desc)))));
        });
    };
    return (React.createElement(MenuSection, { icon: "fa-regular fa-pot-food", id: "restaurants-section", title: "来点小厨私房菜？" }, getRestaurants()));
};
const Movies = () => {
    const getMovies = () => {
        return [{
                desc: "马西莫出生于一个非常繁盛的西西里黑手党家族之中，从小肩上就背负了继承家业的重任。",
                id: 1,
                icon: "fa-solid fa-galaxy",
                image: "https://m.media-amazon.com/images/M/MV5BOTZhMDA2NjgtNGZiMC00NTE1LTk2NjctMWI3ZmZkMjQ1NGVmXkEyXkFqcGdeQXVyMTE5NDQ1MzQ3._V1_.jpg",
                title: "我与黑帮大佬的365天"
            }, {
                desc: "一场谋杀案使银行家安迪蒙冤入狱，谋杀妻子及其情人的指控将囚禁他终生",
                id: 2,
                icon: "fa-solid fa-handcuffs",
                image: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
                title: "肖申克的救赎"
            }, {
                desc: "当一名大学生遇到另一个被她吸引的男人时，她与一个陷入困境的青年的关系受到了考验。",
                id: 2,
                icon: "fa-solid fa-hat-wizard",
                image: "https://m.media-amazon.com/images/M/MV5BN2UyNGM3MDUtMTIzZi00ZDdkLThlYTktYjk0ZDMzM2JiMjMyXkEyXkFqcGdeQXVyNzE0MjkxMzA@._V1_.jpg",
                title: "禁忌世代"
            }, {
                desc: "一个浸润着鲜红与纯白的爱情故事，写在一本笔记本上，被一位老先生，一遍一遍的讲述。",
                id: 3,
                icon: "fa-solid fa-notebook",
                image: "https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg",
                title: "恋恋笔记本"
            }, {
                desc: "出生在一个贫穷的家庭之中，和妹妹以及父母在狭窄的地下室里过着相依为命的日子。",
                id: 4,
                icon: "fa-solid fa-starship-freighter",
                image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
                title: "寄生虫"
            }, {
                desc: "海绵出水剧情:围绕蟹黄堡的秘密配方，痞老板和蟹老板睁开了新一轮的战役。",
                id: 4,
                icon: "fa-sharp fa-solid fa-crab",
                image: "https://m.media-amazon.com/images/I/91dT8udHqNL._SL1500_.jpg",
                title: "海绵宝宝历险记：海绵出水"
            }, {
                desc: "本片讲述了一个由船上的水手抚养长大钢琴天才，取名1900年的传奇一生。",
                id: 4,
                icon: "fa-sharp fa-solid fa-ship",
                image: "https://m.media-amazon.com/images/M/MV5BMzIwOTdmNjQtOWQ1ZS00ZWQ4LWIxYTMtOWFkM2NjODJiMGY4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_FMjpg_UX1000_.jpg",
                title: "海上钢琴师"
            }, {
                desc: "天才疯子科学家在失踪多年后突然回到女儿的身边，并在车库里搞了一个科学实验室。",
                id: 4,
                icon: "fa-sharp fa-solid fa-vial-virus",
                image: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_FMjpg_UX1000_.jpg",
                title: "瑞克和莫蒂"
            }, {
                desc: "因为拥有能够和动物交流的特殊能力而在当地名声大噪。",
                icon: "fa-sharp fa-solid fa-dog",
                image: "https://p3-bk.byteimg.com/tos-cn-i-mlhdmxsy5m/7998e50cc74e4f9c8847b03b02210a26~tplv-mlhdmxsy5m-q75:0:0.image",
                title: "怪医杜立德2"
            }, {
                desc: "一只生活在末世的僵尸，依稀只记得自己的名字里有个“R”。",
                icon: "fa-sharp fa-solid fa-brain",
                image: "https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/151397/warmbodiesnewposter1.jpg",
                title: "温暖的尸体"
            }].map((movie) => {
            const styles = {
                backgroundImage: `url(${movie.image})`
            };
            const id = `movie-card-${movie.id}`;
            return (React.createElement("div", { key: movie.id, id: id, className: "movie-card" },
                React.createElement("div", { className: "movie-card-background background-image", style: styles }),
                React.createElement("div", { className: "movie-card-content" },
                    React.createElement("div", { className: "movie-card-info" },
                        React.createElement("span", { className: "movie-card-title" }, movie.title),
                        React.createElement("span", { className: "movie-card-desc" }, movie.desc)),
                    React.createElement("i", { className: movie.icon }))));
        });
    };
    return (React.createElement(MenuSection, { icon: "fa-solid fa-camera-movie", id: "movies-section", scrollable: true, title: "电影回顾" }, getMovies()));
};
const UserStatusButton = (props) => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    const handleOnClick = () => {
        setUserStatusTo(props.userStatus);
    };
    return (React.createElement("button", { id: props.id, className: "user-status-button clear-button", disabled: userStatus === props.userStatus, type: "button", onClick: handleOnClick },
        React.createElement("i", { className: props.icon })));
};
const Menu = () => {
    return (React.createElement("div", { id: "app-menu" },
        React.createElement("div", { id: "app-menu-content-wrapper" },
            React.createElement("div", { id: "app-menu-content" },
                React.createElement("div", { id: "app-menu-content-header" },
                    React.createElement("div", { className: "app-menu-content-header-section" },
                        React.createElement(Info, { id: "app-menu-info" }),
                        React.createElement(Reminder, null)),
                    React.createElement("div", { className: "app-menu-content-header-section" },
                        React.createElement(UserStatusButton, { icon: "fa-solid fa-arrow-right-from-arc", id: "sign-out-button", userStatus: UserStatus.LoggedOut }))),
                React.createElement(QuickNav, null),
                React.createElement("a", { id: "youtube-link", className: "clear-button", target: "_blank" },
                    React.createElement("span", null, "请期待...")),
                React.createElement(Restaurants, null),
                React.createElement(Tools, null),
                React.createElement(Movies, null)))));
};
const Background = () => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    const handleOnClick = () => {
        if (userStatus === UserStatus.LoggedOut) {
            setUserStatusTo(UserStatus.LoggingIn);
        }
    };
    return (React.createElement("div", { id: "app-background", onClick: handleOnClick },
        React.createElement("div", { id: "app-background-image", className: "background-image" })));
};
const Loading = () => {
    return (React.createElement("div", { id: "app-loading-icon" },
        React.createElement("i", { className: "fa-solid fa-spinner-third" })));
};
const AppContext = React.createContext(null);
const App = () => {
    const [userStatus, setUserStatusTo] = React.useState(UserStatus.LoggedOut);
    const getStatusClass = () => {
        return userStatus.replace(/\s+/g, "-").toLowerCase();
    };
    return (React.createElement(AppContext.Provider, { value: { userStatus, setUserStatusTo } },
        React.createElement("div", { id: "app", className: getStatusClass() },
            React.createElement(Info, { id: "app-info" }),
            React.createElement(Pin, null),
            React.createElement(Menu, null),
            React.createElement(Background, null),
            React.createElement("div", { id: "sign-in-button-wrapper" },
                React.createElement(UserStatusButton, { icon: "fa-solid fa-arrow-right-to-arc", id: "sign-in-button", userStatus: UserStatus.LoggingIn })),
            React.createElement(Loading, null))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));