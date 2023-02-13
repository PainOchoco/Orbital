export default function clamp(
    min: number,
    max: number,
    percentage1: number,
    percentage2: number
): [number, number] {
    return [min + percentage1 * (max - min), min + percentage2 * (max - min)];
}
