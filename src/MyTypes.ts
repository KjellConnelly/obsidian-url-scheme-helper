export type URLSchemeType = {
	name : string,
	description: string,
	format: string,
	parameters : Array<ParameterType>
}

export type ParameterType = {
	[propName: string] : any,
	name : any,
	type : string,
	placeholder? : string,
	encodeURIComponent? : boolean,
	optional? : boolean,
	defaultValue? : any,
	onFormat? : (param:any,userInput?:any,parameters?:Array<any>,i?:number)=>any,
}
