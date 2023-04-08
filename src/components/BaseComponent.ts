const defaultDependencies: string[] = []

export class BaseComponent<T> {
	public dependencies: string[] = defaultDependencies
	public state!:T
}