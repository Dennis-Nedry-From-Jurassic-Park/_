import {Body, Controller, Header, Post, Req} from "@nestjs/common";
import {JetStreamClient} from "nats";
import {TinkoffInvestmentsNotificationService} from "./app.service";
import {Treshold} from "./app.dto";

@Controller('tinkoff-investments')
export class TinkoffInvestmentsNotificationController {
    public client: JetStreamClient | undefined

    constructor(private readonly appService: TinkoffInvestmentsNotificationService) {}

    @Post('add-treshold')
    @Header('content-type', 'application/json')
    async add_treshold(
        @Req() req: Request,
        @Body() msg: Treshold
    ) {
        console.log(msg);
        await this.appService.add_treshold(msg);
    }

    @Post('update-tresholds')
    @Header('content-type', 'application/json')
    async update_tresholds(
        @Req() req: Request,
        @Body() msg: any
    ) {
        await this.appService.update_tresholds();
    }
    @Post('get-tresholds')
    @Header('content-type', 'application/json')
    async get_tresholds(
        @Req() req: Request,
        @Body() msg: any
    ) {
        return await this.appService.get_tresholds();
    }
}