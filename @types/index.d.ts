
type FieldNames<T> = {
    // 해당 클래스 안에서 필드가 Function 인 경우 never 로 설정하고 아닌 경우 해당 필드 값으로 한다.
    [F in keyof T]: T[F] extends Function ? never : F;
}[keyof T];

type Fields<T> = Pick<T, FieldNames<T>>;

type BuilderType<T> = {
    [f in keyof Fields<T>]: (
        arg: T[f]
    ) => BuilderType<T>;
}