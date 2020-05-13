import { EmberClient } from './Ember/Client/index'
import { EmberLib } from './Ember/Lib/index'
import { EmberServer, ServerEvents } from './Ember/Server/index'
import { S101 } from './S101/index'
import { S101Client } from './Ember/Socket/index'
// import { EmberTreeNode, TreeElement } from './types/types'
import { berEncode, berDecode } from './encodings/ber/index'
// import { EmberElement } from './model/EmberElement'

const Decoder = EmberLib.DecodeBuffer

// TODO
// function isValid(_el: EmberTreeNode<EmberElement>): boolean {
// 	return false
// }

// TODO
// function toJSON(_el: TreeElement<EmberElement>): Record<string, any> {
// 	return null
// }

// TODO
// function fromJSON(json: Record<string, any>): TreeElement<EmberElement> {
// 	return null
// }

export {
	EmberClient,
	Decoder,
	EmberLib,
	EmberServer,
	ServerEvents,
	S101,
	S101Client,
	berEncode,
	berDecode
	// isValid,
	// toJSON,
	// fromJSON
}
