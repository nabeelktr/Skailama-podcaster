export default class WidgetController {

    constructor(service) {
        this.service = service
    }

    addWidget = async (req, res, next) => {
        try {
            const widgetId = req.params.id;
            const widgetData = {...req.body, userId: req.user._id}
            const response = await this.service.addWidget(widgetId, widgetData);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };

    addDisplay = async (req, res, next) => {
        try {
            const displayId = req.params.id;
            const response = await this.service.addWidget(displayId, req.body);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };

   
}
