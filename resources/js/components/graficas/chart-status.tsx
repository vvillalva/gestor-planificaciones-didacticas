import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Grafica de los estatus de las quejas"
interface EstatusData {
    month: string;
    en_proceso: number;
    rechazado: number;
    aprobado: number;
}

interface EstatusChartProps{
    data: EstatusData[]
}

const chartConfig = {
    en_proceso: {
        label: "En Proceso",
        color: "var(--chart-2)",
    },
    rechazado: {
        label: "Rechazado",
        color: "var(--chart-1)",
    },
    aprobado: {
        label: "Aprobado",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export function ChartStatus({ data }: EstatusChartProps) {
    //Filtramos Data por Semestre Enero-Junio / Julio-Diciembre
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear().toString();

    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>Estatus de Planeaciones</CardTitle>
                <CardDescription>Enero - Diciembre {anioActual}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="!min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0)} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Bar dataKey="en_proceso" fill="var(--chart-2)" radius={4} />
                        <Bar dataKey="rechazado" fill="var(--chart-1)" radius={4} />
                        <Bar dataKey="aprobado" fill="var(--chart-3)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">Los datos son en todo el año {anioActual}</div>
                <div className="leading-none text-muted-foreground">Se muestran los datos que actualmente se tienen registrados.</div>
            </CardFooter>
        </Card>
    );
}
