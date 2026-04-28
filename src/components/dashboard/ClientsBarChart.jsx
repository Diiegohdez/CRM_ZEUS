import { BarChart, Bar, XAxis, Cell, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function ClientsBarChart({ clients }) {

    return (
        <div className='bg-[#1F2937] p-2 rounded-2xl shadow-2xl'>
            <h2 className="text-xl text-white font-bold mb-4 flex justify-center">
                Distribución de Clientes
            </h2>
            {/* Gráfico de barras para mostrar la distribución de clientes por estado */}
            <ResponsiveContainer width="100%" height={190}>
                <BarChart data={clients} layout="vertical">

                    <XAxis type="number" stroke="#ccc" />
                    <YAxis dataKey="name" type="category" stroke="#ccc" width={92}/>

                    <Tooltip />
                    <Legend />

                    <Bar dataKey="value" radius={[0, 6, 6, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                        {clients.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}