import { createContext, useState, useEffect, useRef } from "react";

const NotificationContext = createContext({
	data: { message: "", type: "" },
	displayed: false,
	setNotification: function (objOrBool, num) {},
});

export function NotificationContextProvider(props) {
	const TIMER_DEFAULT = 3600;

	const [currentNotification, setCurrentNotification] = useState({
		message: "",
		type: "general",
	});
	const [notificationDisplayed, setNotificationDisplayed] = useState(false);
	const timerRef = useRef(null);

	function setNotification(notification = false, time = TIMER_DEFAULT) {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = null;

		if (notification === false) {
			setNotificationDisplayed(false);
			setCurrentNotification({ message: "", type: "" });
		} else {
			if (typeof notification !== "object") return;

			setCurrentNotification(notification);
			setNotificationDisplayed(true);

			if (time) {
				timerRef.current = setTimeout(() => {
					resetNotification();
				}, time);
			}
		}
	}

	function resetNotification() {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = null;
		setNotificationDisplayed(false);
		setCurrentNotification({ message: "", type: "" });
	}

	const context = {
		data: currentNotification,
		displayed: notificationDisplayed,
		setNotification,
	};

	return (
		<NotificationContext.Provider value={context}>
			{props.children}
		</NotificationContext.Provider>
	);
}

export default NotificationContext;
