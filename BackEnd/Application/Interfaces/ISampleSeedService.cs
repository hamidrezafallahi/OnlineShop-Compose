namespace Application.Interfaces;

public interface ISampleSeedService
{
    Task<SampleSeedStatusDto> GetStatusAsync(CancellationToken cancellationToken = default);
    Task<SampleSeedResultDto> ApplyAsync(bool clean, CancellationToken cancellationToken = default);
}

public record SampleSeedStatusDto(
    bool SeedsAvailable,
    string SeedsDirectory,
    IReadOnlyList<string> Files,
    string AutoSeedNote);

public record SampleSeedResultDto(
    bool Success,
    string Message,
    IReadOnlyList<string> AppliedFiles);
