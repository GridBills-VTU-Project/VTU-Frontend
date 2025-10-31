export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[.!@#$%^&*])(?=.*[A-Z]).{7,}$/;
  return passwordRegex.test(password);
};
export function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }