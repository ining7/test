type EditType<T, E extends string | number | symbol = never> = Omit<T, 'id' | 'type' | E>

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P]
}

export type { EditType, DeepPartial }
