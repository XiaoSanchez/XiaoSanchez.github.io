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
                name: "天气预报功能"
            }, {
                icon: "fa-solid fa-calculator-simple",
                id: 2,
                image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FsY3VsYXRvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "计算器",
                name: "高数N级计算器"
            }, {
                icon: "fa-solid fa-piggy-bank",
                id: 3,
                image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmFua3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "记账",
                name: "宝宝的账本"
            }, {
                icon: "fa-solid fa-plane",
                id: 4,
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                label: "旅游",
                name: "和宝宝的旅游计划"
            }, {
                icon: "fa-solid fa-gamepad-modern",
                id: 5,
                image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "游戏",
                name: "打发时间小游戏"
            }, {
                icon: "fa-solid fa-video",
                id: 6,
                image: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpZGVvJTIwY2hhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "联系",
                name: "紧急联系哥哥"
            }].map((tool) => {
            const styles = {
                backgroundImage: `url(${tool.image})`
            };
            return (React.createElement("div", { key: tool.id, className: "tool-card" },
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
                image: "data:image/jpeg;base64,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",
                title: "我与黑帮大佬的365天"
            }, {
                desc: "当一名大学生遇到另一个被她吸引的男人时，她与一个陷入困境的青年的关系受到了考验。",
                id: 2,
                icon: "fa-solid fa-hat-wizard",
                image: "data:image/jpeg;base64,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",
                title: "禁忌世代"
            }, {
                desc: "我必将可憎污秽之物抛在你身上， 辱没你， 为众目所观。",
                id: 3,
                icon: "fa-solid fa-broom-ball",
                image: "data:image/jpeg;base64,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",
                title: "不"
            }, {
                desc: "拥有一个幸福的三口之家，但是数年前儿子的意外身亡让夫妻俩的生活跌落谷底。",
                id: 4,
                icon: "fa-solid fa-starship-freighter",
                image: "https://upload.wikimedia.org/wikipedia/zh/f/f5/The_Invitation_poster.jpg",
                title: "致命邀请"
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
    return (React.createElement(MenuSection, { icon: "fa-solid fa-camera-movie", id: "movies-section", scrollable: true, title: "电影时间" }, getMovies()));
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