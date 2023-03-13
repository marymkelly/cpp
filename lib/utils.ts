// export function combineClassNames(...classes) {
//     let joined = classes.filter(Boolean).join(" ");
//     let split = joined.split(" ");
//     let filtered = "";

//     let reduced = split.reduce((prev, curr) => {
//         let firstDash: number;
//         let prefix: string;
//         let substring: string;

//         if (typeof curr === "string") {
//             firstDash = curr[0] === "-" ? curr.indexOf("-", 1) : curr.indexOf("-");
//             prefix = curr.slice(0, firstDash);
//             substring = curr.slice(firstDash + 1);
//         }

//         return !prev
//             ? curr
//             : {
//                     ...prev,
//                     [prefix]: [substring],
//               };
//     }, {});

//     for (let [key, value] of Object.entries(reduced)) {
//         filtered += `${key}-${value} `;
//     }

//     return filtered;
// }

export function combineClassNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
