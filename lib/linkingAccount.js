// function link() {
//     return (		<button
//         onClick={async () => {
//             await linkProviderAccount("google.com")
//                 .then((res) => res)
//                 .catch((err) => err);
//         }}>
//         Link Google Account
//     </button>
//     <button
//         onClick={async () => {
//             await linkProviderAccount("github.com")
//                 .then((res) => res)
//                 .catch((err) => err);
//         }}>
//         Link Github Account
//     </button>
//     <button
//         onClick={async () => {
//             await unlinkAccount("google.com");
//         }}>
//         Unlink Google Account
//     </button>
//     <button
//         onClick={async () => {
//             await unlinkAccount("github.com");
//         }}>
//         Unlink Github Account
//     </button>)
// }