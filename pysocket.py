
import asyncio
import websockets

async def hit_endpoints(uri):
    async with websockets.connect(uri) as websocket:
        await websocket.send("{\"controller\":{\"knob_sb\":512,\"knob_bb\":512, \"knob_sb_fw\":0, \"knob_sb_bw\":1, \"knob_bb_fw\":0, \"knob_bb_bw\":1}}")
        res = await websocket.recv()
        print(res)

        await websocket.send("{\"pdu\":{\"current_sb\":400,\"current_bb\":549, \"v12_bus\":0, \"v12_battery\":1, \"v48_bus\":0, \"v48_dcdc\":1}}")
        res = await websocket.recv()
        print(res)

asyncio.get_event_loop().run_until_complete(
    hit_endpoints('ws://localhost:5001'))
