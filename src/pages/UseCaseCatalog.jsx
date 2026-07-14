import { useState } from 'react'
import {
  Stack, Group, Text, Badge, Button, Box, ThemeIcon, Title,
  Card, Divider, ScrollArea, TextInput, Select,
} from '@mantine/core'
import {
  IconRoute2, IconRadar, IconUsers, IconChartBar,
  IconLayoutGrid, IconCircleCheck, IconShieldCheck, IconRocket,
  IconTrendingUp, IconSearch, IconChevronRight, IconBolt,
  IconUsersGroup, IconSitemap, IconMathFunction, IconPencil,
  IconPlayerPlay,
} from '@tabler/icons-react'
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from 'recharts'
import { useCases } from '../data/usecases'
import { NRS_LIVE_SIGNALS } from '../data/networkRiskSignals'
import { useUseCase } from '../contexts/UseCaseContext'

// ── Step icon map ──────────────────────────────────────────────────────────────
const STEP_ICONS = {
  signal_detection:           { icon: IconRadar,        color: 'teal'        },
  participant_segmentation:   { icon: IconUsersGroup,   color: 'blue'        },
  simulation:                 { icon: IconMathFunction, color: 'violet'      },
  participant_channel_config: { icon: IconSitemap,      color: 'orange'      },
  human_approval:             { icon: IconCircleCheck,  color: 'red'         },
  compliance:                 { icon: IconShieldCheck,  color: 'green'       },
  content_generation:         { icon: IconPencil,       color: 'grape'       },
  deployment:                 { icon: IconRocket,       color: 'orange'      },
  attribution:                { icon: IconTrendingUp,   color: 'teal'        },
}

// ── Live signals ───────────────────────────────────────────────────────────────
// Airline Network Risk — 9 crew/aircraft/network/passenger/policy signals.
// All route to UC1 (uc-network-risk-operations) per current scope.
// Demo values only; replace with live ops feed values when available.
const LIVE_SIGNALS = NRS_LIVE_SIGNALS
// ── Step icon chain ────────────────────────────────────────────────────────────
function StepChain({ steps, color }) {
  return (
    <Group gap={6} wrap="nowrap" align="center">
      {steps.map((step, i) => {
        const meta = STEP_ICONS[step.panelType] || { icon: IconBolt, color: 'gray' }
        const Icon = meta.icon
        const isAgent = step.actor === 'agent'
        return (
          <Group key={i} gap={6} wrap="nowrap" align="center">
            <ThemeIcon
              size={28}
              radius="xl"
              variant={isAgent ? 'light' : 'filled'}
              color={meta.color}
              style={{ flexShrink: 0 }}
            >
              <Icon size={14} stroke={1.8} />
            </ThemeIcon>
            {i < steps.length - 1 && (
              <Box
                style={{
                  width: 18, height: 1.5, flexShrink: 0,
                  background: `var(--mantine-color-${color}-3)`,
                  borderRadius: 2,
                }}
              />
            )}
          </Group>
        )
      })}
      <Text size="xs" c="dimmed" fw={500} ml={4}>{steps.length} STEPS</Text>
    </Group>
  )
}

// ── Signal severity badge ──────────────────────────────────────────────────────
function SeverityBadge({ severity, color }) {
  return (
    <Badge
      size="xs"
      variant="filled"
      color={color}
      style={{ letterSpacing: '0.04em', fontWeight: 700 }}
    >
      {severity}
    </Badge>
  )
}

// ── Trend chart ────────────────────────────────────────────────────────────────
function SignalTrendChart({ data, color, unit }) {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="sigGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={`var(--mantine-color-${color}-6)`} stopOpacity={0.25} />
            <stop offset="95%" stopColor={`var(--mantine-color-${color}-6)`} stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="x"
          tick={{ fontSize: 10, fill: 'var(--mantine-color-dimmed)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 9, fill: 'var(--mantine-color-dimmed)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}
        />
        <Tooltip
          contentStyle={{ fontSize: 11, borderRadius: 6, padding: '4px 10px' }}
          formatter={v => [v.toLocaleString(), unit || 'Value']}
        />
        <Area
          type="monotone"
          dataKey="v"
          stroke={`var(--mantine-color-${color}-6)`}
          strokeWidth={2}
          fill="url(#sigGrad)"
          dot={{ r: 3, fill: `var(--mantine-color-${color}-6)` }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function UseCaseCatalog({ onRunScenario }) {
  const { launch } = useUseCase()
  const [selectedSignalIdx, setSelectedSignalIdx] = useState(0)
  const [signalFilter, setSignalFilter] = useState('All')

  const handleRun = (uc) => {
    if (onRunScenario) onRunScenario(uc)
    else launch(uc)
  }

  const handleRunSignalScenario = (signal) => {
    // Resolve the signal to an existing workflow — prefer the explicit link,
    // fall back to matching the scenario name to a use-case title.
    const uc = useCases.find(u => u.id === signal.linkedUseCaseId)
      || useCases.find(u => u.title === signal.scenario)
    if (uc) handleRun(uc)
  }

  const selectedSignal = LIVE_SIGNALS[selectedSignalIdx]

  const filteredSignals = signalFilter === 'All'
    ? LIVE_SIGNALS
    : LIVE_SIGNALS.filter(s => s.severity === signalFilter)

  return (
    <Stack gap="lg">
      {/* ════════════════ LIVE SIGNALS ════════════════════════════════ */}
      <Group align="flex-start" gap="md" wrap="nowrap" style={{ minHeight: 600 }}>
          {/* ── Signal list ───────────────────────────────── */}
          <Stack gap="xs" style={{ width: 320, flexShrink: 0 }}>
            {/* Search + filter */}
            <TextInput
              placeholder="Search signals..."
              size="xs"
              radius="md"
              leftSection={<IconSearch size={13} />}
              styles={{ input: { fontSize: 12 } }}
            />
            <Select
              size="xs"
              radius="md"
              data={['All', 'CRITICAL', 'HIGH', 'MEDIUM-HIGH', 'MEDIUM']}
              value={signalFilter}
              onChange={v => setSignalFilter(v || 'All')}
              styles={{ input: { fontSize: 12 } }}
            />
            <Text size="10px" c="dimmed" style={{ letterSpacing: '0.06em' }}>
              Live signals map 1:1 to scenarios
            </Text>

            <ScrollArea h={560} type="scroll" offsetScrollbars>
              <Stack gap={6} pr={8}>
                {filteredSignals.map((sig, idx) => {
                  const realIdx = LIVE_SIGNALS.indexOf(sig)
                  const isSelected = realIdx === selectedSignalIdx
                  return (
                    <Card
                      key={sig.ucId}
                      withBorder
                      radius="md"
                      p="sm"
                      onClick={() => setSelectedSignalIdx(realIdx)}
                      style={{
                        cursor: 'pointer',
                        borderColor: isSelected ? `var(--mantine-color-${sig.severityColor}-6)` : undefined,
                        background: isSelected ? `var(--mantine-color-${sig.severityColor}-light)` : undefined,
                      }}
                    >
                      <Group mb={4} gap="xs">
                        <SeverityBadge severity={sig.severity} color={sig.severityColor} />
                      </Group>
                      <Text fw={600} size="xs" style={{ lineHeight: 1.35 }} mb={4}>
                        {sig.title}
                      </Text>
                      <Text size="10px" c="dimmed" lineClamp={2} mb={6}>
                        {sig.description}
                      </Text>
                      <Group gap="xs" mb={4}>
                        <Group gap={4}>
                          <IconUsers size={11} />
                          <Text size="10px">{sig.metricValue} {sig.metricUnit}</Text>
                        </Group>
                      </Group>
                      <Group justify="space-between" align="center">
                        <Text size="9px" c="dimmed">{sig.sourceChip.split('·')[0].trim()}</Text>
                        <Text size="9px" c="dimmed">{sig.window}</Text>
                      </Group>
                    </Card>
                  )
                })}
              </Stack>
            </ScrollArea>
          </Stack>

          {/* ── Signal detail ─────────────────────────────── */}
          {selectedSignal && (
            <Card withBorder radius="md" p="md" style={{ flex: 1 }}>
              {/* Header */}
              <Group gap="xs" mb="xs" align="flex-start">
                <ThemeIcon size={28} radius="xl" variant="light" color={selectedSignal.severityColor}>
                  <IconBolt size={14} stroke={2} />
                </ThemeIcon>
                <Box style={{ flex: 1 }}>
                  <Group gap="xs" mb={2} wrap="wrap">
                    <Text fw={700} size="sm" style={{ lineHeight: 1.3 }}>{selectedSignal.title}</Text>
                  </Group>
                  <Group gap="xs">
                    <SeverityBadge severity={selectedSignal.severity} color={selectedSignal.severityColor} />
                  </Group>
                </Box>
              </Group>

              {/* Stats row */}
              <Group gap="xl" mb="md" wrap="wrap">
                <Box>
                  <Text fw={800} size="xl" c="green">{selectedSignal.confidence}%</Text>
                  <Text size="10px" c="dimmed">Confidence</Text>
                  <Box style={{ width: 80, height: 3, borderRadius: 2, marginTop: 3, background: 'var(--mantine-color-green-1)' }}>
                    <Box style={{ width: `${selectedSignal.confidence}%`, height: '100%', borderRadius: 2, background: 'var(--mantine-color-green-6)' }} />
                  </Box>
                </Box>
                <Box>
                  <Text fw={800} size="xl" c={selectedSignal.severityColor}>{selectedSignal.metricValue}</Text>
                  <Text size="10px" c="dimmed">{selectedSignal.metricStripLabel}</Text>
                  <Text size="10px" c="dimmed">{selectedSignal.metricSub}</Text>
                </Box>
              </Group>

              {/* Source + agent + date */}
              <Group gap="xs" mb="xs" wrap="wrap">
                <Badge size="xs" variant="outline" color="gray" style={{ fontFamily: 'monospace', fontSize: 9 }}>
                  {selectedSignal.sourceChip}
                </Badge>
                <Badge size="xs" variant="light" color="green">{selectedSignal.agent}</Badge>
                <Text size="10px" c="dimmed">{selectedSignal.date}</Text>
              </Group>

              {/* Signal tag chips */}
              {selectedSignal.tags && (
                <Group gap={6} mb="xs" wrap="wrap">
                  {selectedSignal.tags.map(tag => (
                    <Badge key={tag} size="xs" variant="light" color={selectedSignal.severityColor} style={{ letterSpacing: '0.03em' }}>
                      {tag}
                    </Badge>
                  ))}
                </Group>
              )}

              <Divider mb="xs" />

              {/* Trend chart */}
              <Group justify="space-between" mb={4}>
                <Text size="10px" c="dimmed" fw={600} tt="uppercase" style={{ letterSpacing: '0.07em' }}>
                  {selectedSignal.trendLabel}
                </Text>
                <Text size="10px" c={selectedSignal.severityColor} fw={700} style={{ letterSpacing: '0.04em' }}>
                  CURRENT: {selectedSignal.metricValue} {selectedSignal.metricUnit}
                </Text>
              </Group>
              <SignalTrendChart data={selectedSignal.trendData} color={selectedSignal.severityColor} unit={selectedSignal.metricUnit} />

              <Divider mt="xs" mb="xs" />

              {/* Signal detail */}
              <Text size="10px" c="dimmed" fw={700} tt="uppercase" mb={4} style={{ letterSpacing: '0.07em' }}>
                Signal Detail
              </Text>
              <Text size="xs" c="dimmed" mb="xs">{selectedSignal.detail || selectedSignal.description}</Text>

              {/* Response window */}
              <Text size="xs" c="dimmed" mb="md">
                <Text span fw={600} c="dark" size="xs">Response window: </Text>
                {selectedSignal.window}
              </Text>

              {/* Ready-to-run */}
              <Box style={{ background: 'var(--mantine-color-default-hover)', borderRadius: 8, padding: '10px 14px' }}>
                <Text size="10px" c="dimmed" mb={4}>Ready-to-run scenario</Text>
                <Group justify="space-between" align="center">
                  <Box>
                    <Text fw={700} size="sm">{selectedSignal.scenario}</Text>
                    <Text size="10px" c="dimmed">{selectedSignal.scenarioSub}</Text>
                  </Box>
                  <Button
                    size="xs"
                    color="vanguardRed"
                    radius="md"
                    leftSection={<IconPlayerPlay size={12} stroke={1.8} />}
                    onClick={() => handleRunSignalScenario(selectedSignal)}
                  >
                    Run scenario
                  </Button>
                </Group>
              </Box>
            </Card>
          )}
      </Group>
    </Stack>
  )
}
