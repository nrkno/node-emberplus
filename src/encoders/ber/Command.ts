import * as Ber from '../../Ber'
import { Command, CommandType, GetDirectory, FieldFlags, Invoke } from '../../model/Command'
import { Invocation } from '../../model/Invocation'

export function encodeCommand(el: Command, writer: Ber.Writer) {
	writer.startSequence(Ber.APPLICATION(2)) // TODO - make non magic number?

	writer.startSequence(Ber.CONTEXT(0))
	writer.writeInt(el.number)
	writer.endSequence() // BER.CONTEXT(0)

	if (isGetDirectory(el) && (el as GetDirectory).dirFieldMask) {
		writer.startSequence(Ber.CONTEXT(1))
		writeDirFieldMask((el as GetDirectory).dirFieldMask!, writer)
		writer.endSequence()
	}

	if (isInvoke(el) && el.invocation) {
		writer.startSequence(Ber.CONTEXT(2))
		encodeInvocation(el.invocation, writer)
		writer.endSequence()
	}
	// TODO: options

	writer.endSequence() // BER.APPLICATION(2)
}

function isInvoke(command: Command): command is Invoke {
	return command.number === CommandType.Invoke
}

function isGetDirectory(command: Command): command is GetDirectory {
	return command.number === CommandType.GetDirectory
}

function writeDirFieldMask(fieldMask: FieldFlags, writer: Ber.Writer) {
	const maskToInt: { [flag: string]: number } = {
		[FieldFlags.Sparse]: 0,
		[FieldFlags.All]: 1,
		[FieldFlags.Default]: 2,
		[FieldFlags.Identifier]: 3,
		[FieldFlags.Description]: 4,
		[FieldFlags.Tree]: 5,
		[FieldFlags.Value]: 6,
		[FieldFlags.Connections]: 7
	}

	writer.writeInt(maskToInt[fieldMask])
}

function encodeInvocation(invocation: Invocation, writer: Ber.Writer) {
	writer.startSequence(Ber.APPLICATION(22))
	if (invocation.id != null) {
		writer.startSequence(Ber.CONTEXT(0))
		writer.writeInt(invocation.id)
		writer.endSequence()
	}
	writer.startSequence(Ber.CONTEXT(1))
	writer.startSequence(Ber.BERDataTypes.SEQUENCE)
	for (var i = 0; i < invocation.arguments.length; i++) {
		writer.startSequence(Ber.CONTEXT(0))
		writer.writeValue(invocation.arguments[i]) // TODO - figure out what kind of value to write
		writer.endSequence()
	}
	writer.endSequence()
	writer.endSequence()

	writer.endSequence() // BER.APPLICATION(22)
}
