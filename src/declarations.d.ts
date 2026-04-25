declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }

{/* This is so the module.scss stuff doesn't error out and bother me lmao */}