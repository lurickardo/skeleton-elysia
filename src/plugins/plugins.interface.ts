export interface PluginsInterface<T> {
	execute(server: T): void;
}
